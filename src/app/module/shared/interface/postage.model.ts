import { TableActions } from './tableActions.type';

export interface Postage {
  id?: number;
  weight_from?: number;
  weight_to?: number;
  price?: number;
  createdAt?: string;
  updateAt?: string;
  tableActions?: TableActions;
}
