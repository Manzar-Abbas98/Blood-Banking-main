import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  IsAdmin = false;

  // user = new User();
  user : any = {};
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

  constructor(private _router: Router, public accountService: AccountService, private toastr : ToastrService) {}

  ngOnInit(): void {}

  // login() {
  //   this.accountService.login(this.user).subscribe({
  //     next: (Response) => {
  //       console.log(this.user);
  //       // this.loggedIn = true;
  //     },
  //     error: (error) => console.log(error),
  //   });
  //   if (this.IsAdmin) {
  //     if (
  //       this.adminEmail === 'admin@sectoin.com' &&
  //       this.adminPassword === 'ronaldo123'
  //     ) {
  //       console.log('Admin login successful');
  //       this._router.navigate(['/donors']);
  //     } else {
  //       console.log('Incorrect email or password for admin');
  //       this.msg = 'Incorrect email or password for admin';
  //       this.adminEmail = '';
  //       this.adminPassword = '';
  //     }
  //   }
  // }

  // login() {
  //   if (this.IsAdmin) {
  //     if (
  //       this.adminEmail === 'admin@section.com' &&
  //       this.adminPassword === 'ronaldo123'
  //     ) {
  //       console.log('Admin login successful');
  //       this._router.navigate(['/admindashboard']);
  //     } else {
  //       console.log('Incorrect email or password for admin');
  //       this.msg = 'Incorrect email or password for admin';
  //       this.adminEmail = '';
  //       this.adminPassword = '';
  //     }
  //   } else {
  //     this.accountService.login(this.user).subscribe({
  //       next: (Response) => {
  //         console.log(this.user);
  //         // this.loggedIn = true;
  //       },
  //       error: (error) => console.log(error),
  //     });
  //   }
  //}

  login()
  {
    this.accountService.login(this.user).subscribe({
            next: response => {
              console.log(response);

              // this.loggedIn = true;
            },
            error: error => {
              console.log(error),
              this.toastr.error(error);
            },
            complete: () => {this._router.navigateByUrl('/loginsuccess');
            this.toastr.show("LogIn Successfully");
          }
          });
  }

  logout() 
  {
    this.accountService.logout();
    // this.loggedIn = false;
  }
  

  // Admin() {
  //   this.IsAdmin = !this.IsAdmin;
  // }
}
