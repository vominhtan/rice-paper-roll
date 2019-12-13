import { Injectable } from '@angular/core';
import { JexiaDataSetEndpoint } from './jexia-abstract.service';
import { Product } from '../model/product.model';
import { DataOperations } from '../../jexia/dataOperations.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends JexiaDataSetEndpoint<Product> {
  constructor(protected dataOperations: DataOperations) {
    super('products', dataOperations);
  }
}
