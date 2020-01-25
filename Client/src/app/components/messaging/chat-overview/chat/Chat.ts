import { UserDto } from '../../../../../../../Server/src/models/User';
import { MessageDto } from '../../../../../../../Server/src/models/Message';

export interface Chat {
  recipient: UserDto;
  messages: MessageDto[];
}
