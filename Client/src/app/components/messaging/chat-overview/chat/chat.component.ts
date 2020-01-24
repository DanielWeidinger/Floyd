import { Component, OnInit, Input } from '@angular/core';
import { Chat } from './Chat';
import { IMessage } from '../../../../../../../Server/src/models/Message';
import { SocketService } from 'src/app/services/socket.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() chat: Chat;
  text = '';

  messages: IMessage[];

  constructor(private socketService: SocketService, private authService: AuthService) {
  }

  ngOnInit() {

    const listener = this.socketService.listen('message');

    if (listener !== null) {
      listener.subscribe((result: IMessage) => {
        this.messages.push(result);
      });
    }
  }

  sendMessage() {

    const data: IMessage = {
      user: this.authService.getUsername,
      recipient: this.chat.recipient.username,
      text: this.text,
      timestamp: new Date(),
      read: false
    };

    this.socketService.emit('message', data);
  }

}
