export interface Payment {
  id: number;
  paymentType: string;
  amount: number;
  availableBalance: number;
  description: string;
  userId: number;
  createdAt: string;
}
