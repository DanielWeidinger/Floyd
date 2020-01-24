import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { AuthService } from './auth.service';
import { Config } from './Config';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: SocketIOClient.Socket;
  private connected = false;

  constructor(private authService: AuthService) { }

  connect() {

    const currentToken = this.authService.getToken();

    if (currentToken !== null) {
      this.socket = io(Config.uri, {
        query: {
          token: currentToken
        }
      });

      this.connected = true;
    }
  }

  listen(eventName: string): Observable<any> | null {
    if (!this.connected) {
      this.connect();
      return null;
    }

    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any): boolean {
    if (!this.connected) {
      this.connect();
      return false;
    }

    this.socket.emit(eventName, data);
    return true;
  }
}
