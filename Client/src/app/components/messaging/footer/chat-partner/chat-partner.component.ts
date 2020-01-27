import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '../../chat-overview/chat/Chat';


@Component({
  selector: 'app-chat-partner',
  templateUrl: './chat-partner.component.html',
  styleUrls: ['./chat-partner.component.css']
})
export class ChatPartnerComponent implements OnInit {

  @Input() chat: Chat;

  constructor() { }

  ngOnInit() {
  }

  getBadgeCount(): number {
    return 42;
  }

}
