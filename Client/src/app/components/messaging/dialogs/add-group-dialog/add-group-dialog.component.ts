import { Component, OnInit } from '@angular/core';
import {MessagingService} from '../../../../services/messaging.service';
import { UserDto } from '../../../../../../../Server/src/models/User';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-group-dialog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.css']
})
export class AddGroupDialogComponent implements OnInit {

  username: string;

  constructor(private messagingService: MessagingService, private dialogRef: MatDialogRef<AddGroupDialogComponent>) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  getUserDto(): UserDto {
    return {username: this.username};
  }

}
