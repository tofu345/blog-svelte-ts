export interface Notification {
  id: number;
  message: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  slug: string;
  get_absolute_url: string;
  created: string;
  updated: string;
}
