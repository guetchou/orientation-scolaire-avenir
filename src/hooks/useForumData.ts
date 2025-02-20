
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ForumPost, ForumReply, ForumDomain } from '@/types/forum';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useForumData = () => {
  const queryClient = useQueryClient();

  // Récupérer tous les domaines
  const {
    data: domains,
    isLoading: isLoadingDomains,
    error: domainsError
  } = useQuery({
    queryKey: ['forumDomains'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forum_domains')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as ForumDomain[];
    }
  });

  // Récupérer les posts avec filtres
  const getPosts = async ({
    domain,
    sortBy = 'recent',
    search = ''
  }: {
    domain?: string;
    sortBy?: 'recent' | 'popular' | 'unanswered';
    search?: string;
  }) => {
    let query = supabase
      .from('forum_posts')
      .select(`
        *,
        profiles:author_id (
          username,
          avatar_url
        )
      `);

    // Filtrer par domaine
    if (domain && domain !== 'all') {
      query = query.eq('domain', domain);
    }

    // Recherche
    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    // Tri
    switch (sortBy) {
      case 'recent':
        query = query.order('created_at', { ascending: false });
        break;
      case 'popular':
        query = query.order('likes', { ascending: false });
        break;
      case 'unanswered':
        query = query.eq('replies_count', 0);
        break;
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  };

  // Mutation pour créer un nouveau post
  const createPostMutation = useMutation({
    mutationFn: async (newPost: {
      title: string;
      content: string;
      domain: string;
      tags: string[];
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Non authentifié');

      const { data, error } = await supabase
        .from('forum_posts')
        .insert({
          ...newPost,
          author_id: user.id,
          likes: 0,
          replies_count: 0
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forumPosts'] });
      toast.success('Discussion créée avec succès');
    },
    onError: (error) => {
      toast.error('Erreur lors de la création de la discussion');
      console.error('Erreur création post:', error);
    }
  });

  // Mutation pour ajouter une réponse
  const createReplyMutation = useMutation({
    mutationFn: async ({ postId, content }: { postId: string; content: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Non authentifié');

      const { data, error } = await supabase
        .from('forum_replies')
        .insert({
          post_id: postId,
          content,
          author_id: user.id,
          likes: 0
        })
        .select()
        .single();

      if (error) throw error;

      // Mettre à jour le compteur de réponses
      await supabase
        .from('forum_posts')
        .update({ 
          replies_count: supabase.rpc('increment_replies_count', { post_id: postId })
        })
        .eq('id', postId);

      return data;
    },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['forumPosts'] });
      queryClient.invalidateQueries({ queryKey: ['forumReplies', postId] });
      toast.success('Réponse ajoutée avec succès');
    },
    onError: (error) => {
      toast.error('Erreur lors de l\'ajout de la réponse');
      console.error('Erreur création réponse:', error);
    }
  });

  // Mutation pour le like/unlike
  const toggleLikeMutation = useMutation({
    mutationFn: async ({ id, type }: { id: string; type: 'post' | 'reply' }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Non authentifié');

      const table = type === 'post' ? 'forum_posts' : 'forum_replies';
      
      // Vérifier si déjà liké
      const { data: existingLike } = await supabase
        .from('forum_likes')
        .select()
        .eq('user_id', user.id)
        .eq(`${type}_id`, id)
        .single();

      if (existingLike) {
        // Unlike
        await supabase
          .from('forum_likes')
          .delete()
          .eq('user_id', user.id)
          .eq(`${type}_id`, id);

        await supabase
          .from(table)
          .update({ likes: supabase.rpc('decrement_likes', { item_id: id }) })
          .eq('id', id);
      } else {
        // Like
        await supabase
          .from('forum_likes')
          .insert({ user_id: user.id, [`${type}_id`]: id });

        await supabase
          .from(table)
          .update({ likes: supabase.rpc('increment_likes', { item_id: id }) })
          .eq('id', id);
      }
    },
    onSuccess: (_, { type, id }) => {
      if (type === 'post') {
        queryClient.invalidateQueries({ queryKey: ['forumPosts'] });
      } else {
        queryClient.invalidateQueries({ queryKey: ['forumReplies', id] });
      }
    },
    onError: (error) => {
      toast.error('Erreur lors de la mise à jour du like');
      console.error('Erreur like:', error);
    }
  });

  return {
    domains,
    isLoadingDomains,
    domainsError,
    getPosts,
    createPostMutation,
    createReplyMutation,
    toggleLikeMutation
  };
};
