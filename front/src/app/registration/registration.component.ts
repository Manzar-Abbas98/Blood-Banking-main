import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  // model: any = {};
  registerForm: FormGroup  = new FormGroup({});
  maxDate: Date = new Date();
  validationErrors: string[] | undefined;

  msg = '';

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private _router: Router,
    private accountService: AccountService,
    private toastr : ToastrService,
    private fb : FormBuilder
  ) {}
  


  initializeForm()
  {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      UserName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['male'],
      city: ['karachi'],
      country: ['pakistan'],
      contact: ['', Validators.required],
      bloodGroup: ['O negative'],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next : () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string) : ValidatorFn
  {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value?null : {notMatching: true}
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  ngOnInit(): void 
  {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

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
    const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
    const values = {...this.registerForm.value, dateOfBirth: dob};

    this.accountService.register(values).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: error => {
        this.validationErrors = error
        this.toastr.error(error);
      },
      complete: () => this.toastr.show("Register Successfully")
    });
  }

  private getDateOnly(dob: string| undefined)
  {
    if(!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset())).toISOString().slice(0,10);
  }
}
