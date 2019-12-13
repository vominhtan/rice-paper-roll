import { BaseRecord } from './base.model';

export interface Product extends BaseRecord {
  options?: any;
  name: string;
}
