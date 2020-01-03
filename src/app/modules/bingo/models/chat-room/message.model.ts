import { Base } from './base.model';

export interface Message extends Base {
  createdAt: any;
  hashtag: string;
  content: string
}
