import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginInfo = {username: '', password: ''}
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(username:string, password:string) {
    this.authService.login(username, password)
    .subscribe((() => this.router.navigate(['shifts'])));
  }
}
