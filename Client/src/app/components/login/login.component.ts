import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  login(): void {
    // http service get user
    console.log('Jo lol');
    if (this.authService.updateToken(this.username, this.password)) {
      this.router.navigate(['chat-overview']);
    } else {
      alert('Invalid credentials');
    }
  }
}
