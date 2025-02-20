
import { Database } from '@/integrations/supabase/types';

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author_id: string | null;
  domain: string | null;
  created_at: string;
  updated_at?: string;
  likes: number;
  replies_count: number;
  tags: string[];
}

export interface ForumReply {
  id: string;
  post_id: string | null;
  content: string;
  author_id: string | null;
  created_at: string;
  likes: number;
}

export interface ForumDomain {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  post_count: number;
}

export interface GetPostsParams {
  domain?: string;
  sortBy: 'recent' | 'popular' | 'unanswered';
  search?: string;
}
