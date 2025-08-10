export type OrderStatus = 'active' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  name: string;
  location: string;
  status: OrderStatus;
  deliveryStatus: 'Sit In' | 'To Go';
  image: string;
  rating: boolean;
}