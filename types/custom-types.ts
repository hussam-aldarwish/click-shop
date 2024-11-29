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
