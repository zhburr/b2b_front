import { TableActions } from './tableActions.type';
import { User } from './user.type';

export interface LabelOrder {
  id: number;
  weight_from: number;
  weight_to: number;
  quantity: number;
  price: number;
  inputFile: string;
  outputFile: string;
  deliverd: boolean;
  userId: number;
  user?: User;
  createdAt: string;
  updateAt: string;
  tableActions?: TableActions;
}
