import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from './Config';
import { Observable } from 'rxjs';
import { SocketService } from './socket.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private username: string;

  constructor(private httpService: HttpClient, private router: Router) {}

  public updateToken(givenUsername: string, givenPassword: string): Observable<boolean> {

    return new Observable<boolean>(observer => {
      const body = {
        username: givenUsername,
        password: givenPassword
      };
      this.httpService.post(Config.uri + '/auth/login', body,
      {
        observe: 'response'
      })
      .subscribe((result) => {
        switch (result.status) {
          case 200:
            this.token = result.body.token;
            this.username = givenUsername;
            return observer.next(true);
          default:
            return observer.next(false);
        }
      });
    });
  }

  public getToken(): string | null {
    if (this.token === undefined) {
      this.router.navigate(['login']);
      return null;
    }

    return this.token;
  }

  public getUsername(): string {
    return this.username;
  }
}
