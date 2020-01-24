import { Component, OnInit } from '@angular/core';
import { IGroup } from '../../../../../../Server/src/models/Group';
import { UserView } from '../../../../../../Server/src/models/User';
import { Chat } from './chat/Chat';

@Component({
  selector: 'app-chat-overview',
  templateUrl: './chat-overview.component.html',
  styleUrls: ['./chat-overview.component.css']
})
export class ChatOverviewComponent implements OnInit {

  users: UserView[];
  groups: IGroup[];

  currentChats: Chat[];

  constructor() {
    this.users = [
      {
        username: 'der Bob',
      },
      {
        username: 'der Bob',
      },
      {
        username: 'der Bob',
      },
      {
        username: 'der Bob',
      },
      {
        username: 'der Bob',
      },
      {
        username: 'der Bob',
      },
      {
        username: 'der Bob',
      },
      {
        username: 'der Bob',
      },
      {
        username: 'der Bob',
      },
      {
        username: 'der Bob',
      },
      {
        username: 'der Bob',
      },
      {
        username: 'Der nicht Bob'
      }
    ];

    this.currentChats = [
      {
        recipient: this.users[0],
      },
      {
        recipient: this.users[1],
      }
    ];

   }

  ngOnInit() {
  }

}
