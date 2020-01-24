import { Component, OnInit, Input } from '@angular/core';
import { IMessage } from '../../../../../../../../Server/src/models/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message: IMessage;

  constructor() { }

  ngOnInit() {
  }

}
