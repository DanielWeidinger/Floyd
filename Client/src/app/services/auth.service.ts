import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUyMjAyNGJjMTcyYjAwYWI4YWI3NjFhIn0sImlhdCI6MTU3OTM1NTkwOCwiZXhwIjoxNTgyOTU1OTA4fQ.mgwudms9OIsjMCPRFI3J4vcNz__mWGJ6sJHOqQawAdI";

  constructor(private httpService: HttpClient) { }

  public getToken(): string{
    return this.token;
  }
}
