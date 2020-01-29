import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  passwordAgain: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(): void {
    if(this.password !== this.passwordAgain){
      return alert('password has to match');
    }
    this.authService.updateToken(this.username, this.password, true).subscribe(success => {
      if (success) {
        this.router.navigate(['chat-overview']);
      } else {
        alert('Invalid credentials');
      }
    });
  }
}
