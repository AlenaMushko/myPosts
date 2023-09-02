export interface IComment {
  id: number;
  created_at: Date;
  author_name: string;
  body: string;
  rating: number;
  post_id: number;
}
