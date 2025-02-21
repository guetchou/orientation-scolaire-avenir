
export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  domain: string;
  tags: string[];
  likes: number;
  replies_count: number;
}

export interface CreateForumPost {
  title: string;
  content: string;
  author_id: string;
  domain: string;
  tags: string[];
}
