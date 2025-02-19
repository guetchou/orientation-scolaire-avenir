
export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  domain: string;
  created_at: string;
  updated_at: string;
  likes: number;
  replies_count: number;
  tags: string[];
}

export interface ForumReply {
  id: string;
  post_id: string;
  content: string;
  author_id: string;
  created_at: string;
  likes: number;
}

export interface ForumDomain {
  id: string;
  name: string;
  description: string;
  icon: string;
  post_count: number;
}
