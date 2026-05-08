export interface IPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  authorName: string;
  publishedAt: string;
  mainImageUrl: string;
  tag?: string;
  categories?: { title: string; description: string }[];
}

export interface IPostDetailed extends IPost {
  body: unknown;
}
