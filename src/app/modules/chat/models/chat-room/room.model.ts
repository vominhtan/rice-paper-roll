import { Message } from './message.model';
import { Base } from './base.model';

export interface Room extends Base {
  messages: Message[];
  users: any[];
}
