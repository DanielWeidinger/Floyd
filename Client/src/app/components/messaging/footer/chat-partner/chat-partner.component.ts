import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '../../chat-overview/chat/Chat';
import { MessagingService } from 'src/app/services/messaging.service';
import { MessageDto } from '../../../../../../../Server/src/models/Message';
import { UserDto } from '../../../../../../../Server/src/models/User';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-chat-partner',
  templateUrl: './chat-partner.component.html',
  styleUrls: ['./chat-partner.component.css']
})
export class ChatPartnerComponent implements OnInit {

  @Input() chat: Chat;
  you: UserDto;

  constructor(private messagingService: MessagingService, private authService: AuthService) {
    this.you = authService.getUser();
  }

  ngOnInit() {
    this.messagingService.receiveMessages().subscribe((result: MessageDto) => {

      console.log("Received: ")
      console.log(result)

      if (result.username === result.recipient) {
        return;
      }

      if (result.username === this.chat.recipient.username || result.recipient === this.you.username) {
        this.chat.messages.push(result);
      }
    });
  }

  getBadgeCount(): number {
    return this.chat.messages.filter(message => !message.read && message.recipient === this.chat.recipient.username).length;
  }

}
