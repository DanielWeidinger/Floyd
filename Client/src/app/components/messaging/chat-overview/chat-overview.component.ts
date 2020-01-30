import {Component, EventEmitter, OnInit} from '@angular/core';
import { Chat } from './chat/Chat';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {AddContactDialogComponent} from '../dialogs/add-contact-dialog/add-contact-dialog.component';
import {MatDialog} from '@angular/material';
import {MessagingService} from '../../../services/messaging.service';
import { UserDto } from '../../../../../../Server/src/models/User';
import {AddGroupDialogComponent} from '../dialogs/add-group-dialog/add-group-dialog.component';
import {Subject} from 'rxjs';
import { GroupDto } from '../../../../../../Server/src/models/Group';

@Component({
  selector: 'app-chat-overview',
  templateUrl: './chat-overview.component.html',
  styleUrls: ['./chat-overview.component.css']
})
export class ChatOverviewComponent implements OnInit {

  currentChats: Chat[];

  public eventsSubject: Subject<Chat> = new Subject<Chat>();

  constructor(private messagingService: MessagingService, private dialog: MatDialog) {
    this.currentChats = [];
  }

  ngOnInit() {

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

  addContact() {
    const addContactDialog = this.dialog.open(AddContactDialogComponent);

    addContactDialog.afterClosed().subscribe((contact: UserDto | null) => {
      if (!contact) {
        throw new Error('AddContact: user not found');
      }

      this.messagingService.addContacts(contact.username).subscribe((result: UserDto) => {
        this.eventsSubject.next(this.createChat(result, false));
      });
    });
  }

  addGroup() {
    const addGroupDialog = this.dialog.open(AddGroupDialogComponent);

    addGroupDialog.afterClosed().subscribe((group: GroupDto | null) => {
      if (!group) {
        throw new Error('AddGroup: group not found');
      }

      this.messagingService.addGroup(group.name, group.users).subscribe((result: GroupDto) => {
        this.eventsSubject.next(this.createChat(null, true, result));
      });
    });
  }

  createChat(user: UserDto, isGroupParam: boolean, givenGroup?: GroupDto): Chat {
    return {recipient: user, messages: [], isGroup: isGroupParam, group: givenGroup};
  }
}
