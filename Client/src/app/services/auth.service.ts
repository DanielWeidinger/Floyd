import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from './Config';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserDto } from '../../../../Server/src/models/User';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private user: UserDto;

  constructor(private httpService: HttpClient, private cookieService: CookieService, private router: Router) {
    /*this.token = cookieService.get('token');
    const userString = cookieService.get('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }*/
  }

  public updateToken(givenUsername: string, givenPassword: string, signIn?: boolean): Observable<boolean> {

    const route = signIn ? '/auth/register' : '/auth/login';

    return new Observable<boolean>(observer => {
      const body = {
        username: givenUsername,
        password: givenPassword
      };
      this.httpService.post(Config.uri + route, body,
      {
        observe: 'response'
      })
      .subscribe((result: any) => {
        switch (result.status) {
          case 200:
            this.token = result.body.token;
            this.user = this.createUser(givenUsername);
            this.cookieService.set('token', this.token);
            this.cookieService.set('user', JSON.stringify(this.user));
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

  public createUser(givenUsername: string): UserDto {
    return {username: givenUsername };
  }

  public getUser(): UserDto {
    return this.user;
  }
}
