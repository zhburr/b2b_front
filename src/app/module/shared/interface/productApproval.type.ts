import { TableActions } from './tableActions.type';
import { User } from './user.type';

export interface ProductApproval {
  id: number;
  csv: string;
  status: string;
  userId: number;
  createdAt: string;
  updateAt: string;
  user: User;
  tableActions?: TableActions;
}
