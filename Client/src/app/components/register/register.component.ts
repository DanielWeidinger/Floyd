import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  passwordAgain: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  register(): void {
    if (this.password === this.passwordAgain) {
      // http Service add user
      this.router.navigate(['chat-overview']);
    } else {
      alert('Password has to be identical');
    }
  }
}
