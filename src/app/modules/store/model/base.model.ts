export enum Status {
  ARCHIVED = 'ARCHIVED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MARK_FOR_DELETE = 'MARK_FOR_DELETE'
}

export interface BaseRecord<T extends any> {
  id: string;
  created_at: string;
  updated_at: string;
  status: Status;
  type?: T;
}
