import { Message } from './message.model';
import { Base } from './base.model';

export interface User extends Base {
  hashtag: string;
  username: string;
}
