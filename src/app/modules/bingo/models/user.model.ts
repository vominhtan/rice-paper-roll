import { Message } from './message.model';
import { Base } from './base.model';

export interface User extends Base {
  kind: 'user',
  hashtag: string;
  username: string;
}
