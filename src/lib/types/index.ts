export interface Notif {
  id: number;
  message: string;
}

export interface PostObj {
  id: number;
  title: string;
  content: string;
  author: string;
  slug: string;
  to: string;
  created: string;
  updated: string;
}

interface UserObj {
  username: string;
  accessToken: string;
  refreshToken: string;
}

export type User = UserObj | null;
