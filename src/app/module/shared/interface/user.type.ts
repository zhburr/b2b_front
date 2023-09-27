export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  isVat?: boolean;
  emailVerified?: boolean;
  role?: string;
  balance?: number;
  credit?: number;
  createdAt?: string;
  updateAt?: string;
  access_toke?: string;
  productsCount?: number;
  canUploadOrder?: boolean;
  avatar?: string | ArrayBuffer | null;
}
