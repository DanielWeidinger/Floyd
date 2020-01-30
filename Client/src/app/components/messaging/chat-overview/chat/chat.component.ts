import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
  unread: number;
  you: UserDto;
  text = '';

  @ViewChild('scroll', {static: false}) private scroller: ElementRef;

  constructor(private messagingService: MessagingService, private authService: AuthService) {
    this.you = this.authService.getUser();
  }

  ngOnInit() {
    if (!this.isPreview) {
      const currUnread = this.chat.messages.filter(message => !message.read).length;
      console.log(currUnread)

      this.messagingService.getMessages().subscribe((history: MessageDto[]) => {
        this.chat.messages = history
        .filter(message => message.username === this.chat.recipient.username && message.recipient === this.you.username
                        || message.username === this.you.username && message.recipient === this.chat.recipient.username);

        this.unread = this.chat.messages.length - currUnread;
      });
    }
  }

  sendMessage() {
    const message: MessageDto = {
      username: this.you.username,
      recipient: this.chat.recipient.username,
      text: this.text,
      timestamp: new Date(),
      read: false,
      multipleRecipients: false
    };

    this.chat.messages.push(message);
    this.messagingService.sendMessage(message);

    this.scrollToBottom();
  }

  scrollToBottom(){
    try {
      this.scroller.nativeElement.scrollTop = this.scroller.nativeElement.scrollHeight;
    } catch (err) {

    }
  }

}
