import { UserDto, IUser } from '../../../../../../../Server/src/models/User';
import { MessageDto } from '../../../../../../../Server/src/models/Message';


export class Chat {
  recipient: UserDto;
  isGroup: boolean;
  messages: MessageDto[];
}
