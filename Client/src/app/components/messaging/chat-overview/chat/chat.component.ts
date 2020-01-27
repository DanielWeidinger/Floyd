import { Component, OnInit, Input } from '@angular/core';
import { Chat } from './Chat';
import { MessageDto } from '../../../../../../../Server/src/models/Message';
import { AuthService } from 'src/app/services/auth.service';
import { UserDto } from '../../../../../../../Server/src/models/User';
import { MessagingService } from 'src/app/services/messaging.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() isPreview = false;
  @Input() chat: Chat;
  you: UserDto;
  text = '';


  constructor(private messagingService: MessagingService, private authService: AuthService) {
    this.you = this.authService.getUser();
  }

  ngOnInit() {

    if (!this.isPreview) {
      this.messagingService.getMessages().subscribe((history: MessageDto[]) => {
        console.log(history)
        this.chat.messages = history
        .filter(message => (message.username === this.you.username || message.recipient === this.you.username) &&
                           (message.recipient === this.chat.recipient.username || message.username === this.chat.recipient.username));
      });

      this.messagingService.receiveMessages().subscribe((result: MessageDto) => {
        if (result.username === this.chat.recipient.username && result.recipient === this.you.username) {
          this.chat.messages.push(result);
        }
      });
    }
  }

  sendMessage() {
    const message: MessageDto = {
      username: this.you.username,
      recipient: this.chat.recipient.username,
      text: this.text,
      timestamp: new Date(),
      read: false
    };

    this.chat.messages.push(message);
    this.messagingService.sendMessage(message);
  }
}
