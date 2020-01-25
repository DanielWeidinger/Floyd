import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from './Config';
import { UserDto } from '../../../../Server/src/models/User';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private authService: AuthService, private httpService: HttpClient) { }

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
}
