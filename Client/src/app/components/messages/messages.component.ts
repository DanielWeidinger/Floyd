import { Component, OnInit } from '@angular/core';
import { PusherService } from 'src/app/services/pusher.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  private messages: Message[]

  userName: string;
  messageText: string;

  constructor(private pusherService: PusherService) {

    this.messages = [];
  }

  ngOnInit() {

    this.pusherService.messagesChannel.bind('client-new-message', (msg) => {
      console.log(msg)
      this.messages.push(msg)
    })

  }

  sendMessage(user: string, text: string) {
    const message: Message = {
       user: user,
       text: text,
    }

    this.pusherService.messagesChannel.trigger('client-new-message', message);
    this.messages.push(message);
  }

}
