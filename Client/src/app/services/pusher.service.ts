import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';
@Injectable({
  providedIn: 'root'
})
export class PusherService {

  private pusher: Pusher.Pusher;
  messagesChannel: Pusher.Channel;

  constructor() {

    this.pusher = new Pusher('93da0690b2a2d810e34f', {
      authEndpoint: 'http://localhost:5000/api/auth',
      cluster: 'eu',
      forceTLS: true
    });

    this.messagesChannel = this.pusher.subscribe('private-messages');

   }
}
