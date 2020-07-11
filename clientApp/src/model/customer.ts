import { Register } from './register';
import { Order } from './order';
export class Customer {
  id?: number;
  user: Register;
  orders: Array<Order>;
}
