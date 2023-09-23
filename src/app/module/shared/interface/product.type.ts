export interface Product {
  id: number;
  title: string;
  sku: string;
  description: string;
  quantity: number;
  weight: number;
  location: string;
  price: number;
  userId: number;
  image: string | ArrayBuffer | null;
  packaging: string;
  createdAt: string;
  updateAt: string;
}
