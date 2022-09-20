export type ArticleType = {
  id: string;
  title: string;
  description: string;
  upvotes?: number;
  user?: { 
    username: string;
  };
  body_html?: string;
}

export type UpvoteType = {
  id: string;
}