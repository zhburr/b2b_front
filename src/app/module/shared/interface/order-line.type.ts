import { Product } from './product.type';

export interface OrderLines {
  buyerAddress1: string;
  buyerAddress2: string;
  buyerCity: string;
  buyerCountry: string;
  buyerName: string;
  buyerPostCode: string;
  createdAt: string;
  id: number;
  orderId: number;
  productQuantity: number;
  trackingNo?: string;
  trackingCompany?: string;
  productSku: string;
  updateAt: string;
  product?: Product;
}
