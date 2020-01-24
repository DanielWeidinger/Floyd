import { Component, OnInit, Input } from '@angular/core';
import { IGroup } from '../../../../../../Server/src/models/Group';
import { UserView } from '../../../../../../Server/src/models/User';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() users: UserView[];
  groups: IGroup[];

  constructor() { }

  ngOnInit() {
  }

}
