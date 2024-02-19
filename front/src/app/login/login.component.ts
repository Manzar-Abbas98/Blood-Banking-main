import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  IsAdmin = false;

  user = new User();
  msg = '';
  adminEmail = '';
  adminPassword = '';
  rememberMe: boolean = false;

  showPassword: boolean = false;
  showAdminPassword: boolean = false;
  toggleAdminPasswordVisibility() {
    this.showAdminPassword = !this.showAdminPassword;
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(private _router: Router, public accountService: AccountService) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.user).subscribe({
      next: (Response) => {
        console.log(this.user);
        // this.loggedIn = true;
      },
      error: (error) => console.log(error),
    });
  }

  logout() {
    this.accountService.logout();
    // this.loggedIn = false;
  }

  Admin() {
    this.IsAdmin = !this.IsAdmin;
  }
}
