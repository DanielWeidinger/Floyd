import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from './Config';
import { UserDto } from '../../../../Server/src/models/User';
import { SocketService } from './socket.service';
import { MessageDto } from '../../../../Server/src/models/Message';
import { GroupDto } from '../../../../Server/src/models/Group';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private socketService: SocketService, private authService: AuthService, private httpService: HttpClient) { }

  public sendMessage(message: MessageDto) {
    this.socketService.emit('message', message);
  }

  public receiveMessages(): Observable<MessageDto> {

    const listener = this.socketService.listen('message');

    return new Observable<MessageDto>(observer => {
      if (listener) {
        listener.subscribe((result: MessageDto) => {
          observer.next(result);
        });
      } else {
        console.error('socketio not connected');
      }
    });
  }

  public getContacts(): Observable<UserDto[]> {
    return new Observable<UserDto[]>(observer => {
      this.httpService.get(Config.uri + '/messaging/contacts', {
      headers: {
        token: this.authService.getToken()
      }}).subscribe((contracts: UserDto[]) => {
        observer.next(contracts);
      });
    });
  }

  public addContacts(givenContactUsername: string): Observable<UserDto> {
    return new Observable<UserDto>(observer => {
      this.httpService.post(Config.uri + '/messaging/contact',
      { // body
        contactUsername: givenContactUsername
      },
      { // header
        headers: {
          token: this.authService.getToken()
        },
      }
      )
      .subscribe((newContact: UserDto) => {
        observer.next(newContact);
      });
    });
  }

  public addGroup(groupName: string, users: string[]): Observable<GroupDto> {
    return new Observable<GroupDto>(observer => {
      this.httpService.post(Config.uri + '/messaging/contact',
      { // body
        name: groupName,
        groupMembers: users
      },
      { // header
        headers: {
          token: this.authService.getToken()
        },
      }
      )
      .subscribe((newGroup: GroupDto) => {
        observer.next(newGroup);
      });
    });
  }

  public getMessages(): Observable<MessageDto[]> {
    return new Observable<MessageDto[]>(observer => {
      this.httpService.get(Config.uri + '/messaging/messages', {
      headers: {
        token: this.authService.getToken()
      }}).subscribe((messages: MessageDto[]) => {
        observer.next(messages);
      });
    });
  }
}
