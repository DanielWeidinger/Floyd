import { Component, OnInit, Input } from '@angular/core';
import { MessageDto } from '../../../../../../../../Server/src/models/Message';
import { UserDto } from '../../../../../../../../Server/src/models/User';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() you: UserDto;
  @Input() message: MessageDto;

  constructor() { }

  ngOnInit() {
  }

}
