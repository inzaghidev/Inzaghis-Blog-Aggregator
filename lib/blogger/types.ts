export type BlogSource = "legacy" | "teknoblog" | "miniblog";
export type Article = {
  id: string;
  blogId: string;
  source: BlogSource;
  title: string;
  content: string;
  excerpt: string;
  published: string;
  updated?: string;
  url: string;
  cover: string;
  labels: string[];
  author: { name: string; avatar?: string; bio?: string };
  views?: number;
  comments?: number;
};
export type Blog = {
  id: string;
  name: string;
  description?: string;
  url?: string;
  source: BlogSource;
};
