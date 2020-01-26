import { Component, OnInit } from '@angular/core';
import { Chat } from './chat/Chat';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-chat-overview',
  templateUrl: './chat-overview.component.html',
  styleUrls: ['./chat-overview.component.css']
})
export class ChatOverviewComponent implements OnInit {

  currentChats: Chat[];

  constructor() {
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

}
