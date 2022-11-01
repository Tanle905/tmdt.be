import { Address } from "./address.interface";
import { Product } from "./product.interface";

export interface OrderDetails {
  userId: string;
  paymentStatus: string;
  orderStatus: string;
  currency: string;
  totalPrice: number;
  items: (Product & { quantity: number })[];
  address: Address;
}
