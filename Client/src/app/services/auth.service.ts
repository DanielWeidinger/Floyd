import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from './Config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;

  constructor(private httpService: HttpClient) {}

  public updateToken(givenUsername: string, givenPassword: string): boolean {

    const body = new HttpParams();
    body.set('username', givenUsername);
    body.set('password', givenPassword);

    this.httpService.post(Config.uri + '/login', body,
    {
      observe: 'response'
    })
    .subscribe((result) => {
      if (result.status === 200) {
        console.log(result);
        this.token = result.body.toString();
        return true;
      } else {
        return false;
      }
    });

    return false;
  }

  public getToken(): string {
    return this.token;
  }
}
