import { Injectable } from '@angular/core';
import { dataOperations, Dataset, DataOperationsModule} from 'jexia-sdk-js/browser';
import { JexiaClient } from './client.service';

export const sdkDataOperationsModule: DataOperationsModule = dataOperations();

@Injectable()
export class DataOperations {

  constructor(
    private client: JexiaClient,
  ) { }

  dataset<T extends object = any>(name: string): Dataset<T> {
    this.client.init();
    return sdkDataOperationsModule.dataset<T>(name);
  }

  terminate(): Promise<this> {
    return sdkDataOperationsModule.terminate().then(() => this);
  }

}
