import { PaymentModel } from './paymentModel';
import { Product } from './product';

export class Order {
  id?: number;
  name: string;
  address: string;
  number: number;
  orderDate?: string;
  payment: PaymentModel;
  products: Array<Product>;
}
