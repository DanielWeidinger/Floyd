import { MatDialog } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { IGroup } from '../../../../../../Server/src/models/Group';
import { UserDto } from '../../../../../../Server/src/models/User';
import { MessagingService } from 'src/app/services/messaging.service';
import { AddContactDialogComponent } from '../dialogs/add-contact-dialog/add-contact-dialog.component';
import { Chat } from '../chat-overview/chat/Chat';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() chats: Chat[];
  groups: IGroup[];

  constructor(private messagingService: MessagingService, private dialog: MatDialog) { }

  ngOnInit() {
    this.messagingService.getContacts().subscribe((result: UserDto[]) => {
      this.chats = result.map(user => this.createChat(user));
    });
  }

  addContact() {
    const addContactDialog = this.dialog.open(AddContactDialogComponent);

    addContactDialog.afterClosed().subscribe((contact: UserDto | null) => {
      if (!contact) {
        throw new Error('AddContact: user not found');
      }

      this.messagingService.addContacts(contact.username).subscribe((result: UserDto) => {
        this.chats.push(this.createChat(result));
      });
    });
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

  createChat(user: UserDto): Chat {
    return {recipient: user, messages: null}
  }
}
