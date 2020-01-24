import { Component, OnInit, Input } from '@angular/core';
import { UserView } from '../../../../../../../Server/src/models/User';


@Component({
  selector: 'app-chat-partner',
  templateUrl: './chat-partner.component.html',
  styleUrls: ['./chat-partner.component.css']
})
export class ChatPartnerComponent implements OnInit {

  @Input() user: UserView;

  constructor() { }

  ngOnInit() {
  }

}
