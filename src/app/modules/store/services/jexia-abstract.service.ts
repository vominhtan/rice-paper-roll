import { Observable, from } from 'rxjs';
import { Dataset, field, IFilteringCriterion } from 'jexia-sdk-js';
import { DataOperations } from '../../jexia';
import { BaseRecord, Status } from '../model/base.model';

export abstract class JexiaDataSetEndpoint<T extends BaseRecord<any>> {
  private dataset: Dataset<T>;
  constructor(datasetName: string, protected dataOperations: DataOperations) {
    this.dataset = dataOperations.dataset<T>(datasetName);
  }

  public fetch(related?: keyof T): Observable<T[]> {
    const selectQuery = this.dataset.select();
    return from((related ? selectQuery.related(related) : selectQuery).execute() as Promise<T[]>);
  }

  public add(data: T): Observable<T[]> {
    return from(this.dataset.insert(data).execute() as Promise<T[]>);
  }

  public update(data: T): Observable<T[]> {
    return from(
      this.dataset
        .update(data)
        .where(this.isSameId(data))
        .execute() as Promise<T[]>,
    );
  }

  public delete(data: T): Observable<T[]> {
    data.status = Status.MARK_FOR_DELETE;
    return from(
      this.dataset
        .update({ status: Status.MARK_FOR_DELETE } as T)
        .where(this.isSameId(data))
        .execute() as Promise<T[]>,
    );
  }

  public deleteForce(data: T): Observable<T[]> {
    return from(
      this.dataset
        .delete()
        .where(field('id').isEqualTo(data['id']))
        .execute() as Promise<T[]>,
    );
  }

  public deleteAll(): void {}

  getDataset(): Dataset<T> {
    return this.dataset;
  }

  protected isSameId(record: T): IFilteringCriterion {
    return field('id').isEqualTo(record.id);
  }
}
