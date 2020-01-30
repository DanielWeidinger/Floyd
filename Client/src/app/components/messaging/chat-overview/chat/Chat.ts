import { UserDto, IUser } from '../../../../../../../Server/src/models/User';
import { MessageDto } from '../../../../../../../Server/src/models/Message';
import { GroupDto } from '../../../../../../../Server/src/models/Group';


export class Chat {
  recipient: UserDto;
  group?: GroupDto;
  isGroup: boolean;
  messages: MessageDto[];
}
