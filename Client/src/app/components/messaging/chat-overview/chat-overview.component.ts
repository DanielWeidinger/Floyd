import { Component, OnInit } from '@angular/core';
import { IGroup } from '../../../../../../Server/src/models/Group';
import { UserView } from '../../../../../../Server/src/models/User';
import { Chat } from './chat/Chat';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-overview',
  templateUrl: './chat-overview.component.html',
  styleUrls: ['./chat-overview.component.css']
})
export class ChatOverviewComponent implements OnInit {

  users: UserView[];
  groups: IGroup[];

  currentChats: Chat[];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getContacts().subscribe(result => {
      console.log(result);
    })
  }

}
