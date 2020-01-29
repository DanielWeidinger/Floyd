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
    this.messagingService.receiveMessages().subscribe((message: MessageDto) => {

      if (message.username === message.recipient) {
        return;
      }

      console.log(message)
      if (message.username === this.chat.recipient.username && message.recipient === this.you.username
          || message.username === this.you.username && message.recipient === this.chat.recipient.username) {
        this.chat.messages.push(message);
      }
    });
  }

  getBadgeCount(): number {
    return this.chat.messages.filter(message => !message.read).length;
  }

}
