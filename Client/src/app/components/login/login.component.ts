import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    // http service get user
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['chat-overview']);
    } else {
      alert('Invalid credentials');
    }
  }
}
