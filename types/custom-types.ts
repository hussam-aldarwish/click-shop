export type PaginatedResponse<T> = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
};

export type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  images: {
    title: string;
    description: string;
    url: string;
  }[];
  price: number;
  tags: string[];
};
