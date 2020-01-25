import { Component, OnInit } from '@angular/core';
import { Chat } from './chat/Chat';

@Component({
  selector: 'app-chat-overview',
  templateUrl: './chat-overview.component.html',
  styleUrls: ['./chat-overview.component.css']
})
export class ChatOverviewComponent implements OnInit {

  currentChats: Chat[];

  constructor() {}

  ngOnInit() {

  }

}
