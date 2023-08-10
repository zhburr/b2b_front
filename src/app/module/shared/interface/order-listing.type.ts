import { OrderLines } from './order-line.type';
import { TableActions } from './tableActions.type';
import { User } from './user.type';

export interface Order {
  id?: number;
  csv?: string;
  invoice?: string;
  userId?: number;
  totalAmount?: number;
  paid?: boolean;
  delivered?: boolean;
  createdAt?: string;
  updateAt?: string;
  user?: User;
  tableActions?: TableActions;
  OrderLine?: OrderLines[];
}
