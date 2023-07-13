export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  isVat?: boolean;
  emailVerified?: boolean;
  role?: string;
  balance?: number;
  createdAt?: string;
  updateAt?: string;
  access_toke?: string;
  productsCount?: number;
}
