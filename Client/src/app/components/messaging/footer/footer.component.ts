import { Component, OnInit, Input } from '@angular/core';
import { IGroup } from '../../../../../../Server/src/models/Group';
import { UserDto } from '../../../../../../Server/src/models/User';
import { MessagingService } from 'src/app/services/messaging.service';
import { MatDialog } from '@angular/material';
import { AddContactDialogComponent } from '../dialogs/add-contact-dialog/add-contact-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() users: UserDto[];
  groups: IGroup[];

  constructor(private messagingService: MessagingService, private dialog: MatDialog) { }

  ngOnInit() {
    this.messagingService.getContacts().subscribe((result: UserDto[]) => {
      this.users = result;
    });
  }

  addContact() {
    const addContactDialog = this.dialog.open(AddContactDialogComponent);

    addContactDialog.afterClosed().subscribe((contact: UserDto | null) => {
      if (!contact) {
        throw new Error('AddContact: user not found');
      }

      this.messagingService.addContacts(contact.username).subscribe((result: UserDto) => {
        this.users.push(result);
      });
    });
  }
}
