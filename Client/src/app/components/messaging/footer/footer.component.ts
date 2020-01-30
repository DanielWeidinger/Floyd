import { MatDialog } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { IGroup } from '../../../../../../Server/src/models/Group';
import { UserDto } from '../../../../../../Server/src/models/User';
import { MessagingService } from 'src/app/services/messaging.service';
import { Chat } from '../chat-overview/chat/Chat';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() chats: Chat[];
  groups: IGroup[];

  private eventsSubscription: Subscription;

  @Input() events: Observable<Chat>;

  constructor(private messagingService: MessagingService, private dialog: MatDialog) { }

  ngOnInit() {
    this.messagingService.getContacts().subscribe((result: UserDto[]) => {
      this.chats = result.map(user => this.createChat(user, false));
    });
    this.eventsSubscription = this.events.subscribe(chat => this.chats.push(chat));
  }

  drop(event: CdkDragDrop<Chat[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  createChat(user: UserDto, group: boolean): Chat {
    return {recipient: user, messages: [], isGroup: group};
  }
}
