import { BaseRecord } from './base.model';

export interface Product extends BaseRecord<any> {
  options?: any;
  name: string;
  price: number;
}
