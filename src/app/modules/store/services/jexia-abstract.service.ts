import { Observable, from } from 'rxjs';
import { Dataset, field } from 'jexia-sdk-js';
import { DataOperations } from '../../jexia';

export abstract class JexiaDataSetEndpoint<T extends object> {
  private dataset: Dataset<T>;
  constructor(datasetName: string, protected dataOperations: DataOperations) {
    this.dataset = dataOperations.dataset<T>(datasetName);
  }

  public fetch(): Observable<T[]> {
    return from(this.dataset.select().execute() as Promise<T[]>);
  }

  public add(data: T): Observable<T[]> {
    return from(this.dataset.insert(data).execute() as Promise<T[]>);
  }

  public delete(data: T): Observable<T[]> {
    return from(this.dataset.delete().where(field('id').isEqualTo(data['id'])).execute() as Promise<T[]>)
  }

  public deleteAll(): void {}

  getDataset(): Dataset<T> {
    return this.dataset;
  }
}
