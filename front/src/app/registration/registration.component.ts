import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  model: any = {};

  msg = '';

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private _router: Router,
    private accountService: AccountService,
    private toastr : ToastrService
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  ngOnInit(): void {}

  // registerUser() {
  //   this._service.registerUserFromRemote(this.user).subscribe(
  //     data => {
  //       console.log("Registration Success");
  //       sessionStorage.setItem("USER", this.user.username); // Use sessionStorage consistently
  //       this._router.navigate(['/registrationsuccess']);
  //     },
  //     error => {
  //       console.log("Registration Failed");
  //       console.error(error);  // Log the entire error object for debugging
  //       if (error.error && error.error.message) {
  //         this.msg = error.error.message;  // Display a specific error message if available
  //       } else {
  //         this.msg = "User registration failed. Please try again.";  // Generic error message
  //       }
  //     }
  //   );
  // }
  register() {
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: error => {
        console.log(error),
        this.toastr.error(error);
      },
      complete: () => this.toastr.show("Register Successfully")
    });
  }
}
