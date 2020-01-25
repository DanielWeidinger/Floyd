import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';
import { UserDto } from '../../../../../../../Server/src/models/User';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
  styleUrls: ['./add-contact-dialog.component.css']
})
export class AddContactDialogComponent implements OnInit {

  username: string;

  constructor(private messagingService: MessagingService, private dialogRef: MatDialogRef<AddContactDialogComponent>) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  getUserDto(): UserDto {
    return {username: this.username};
  }

}
