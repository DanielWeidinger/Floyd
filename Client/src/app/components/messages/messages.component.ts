import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  private messages: Message[]

  userName: string;
  messageText: string;

  constructor(private socketService: SocketService) {

    this.messages = [];
  }

  ngOnInit() {

    this.socketService.listen("message").subscribe((data) => {
      console.log(data)
    })

  }

  sendMessage(user: string, text: string) {
    const message: Message = {
       user: user,
       text: text,
    }
    
    this.socketService.emit("message", message);
  }

}
