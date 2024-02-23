import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './user';
import { MyUser } from './_models/MyUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'BloodBankManagement';
  users: any;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    // this.getUsers();
    this.setCurrentUSer();
  }

  // getUsers() {
  //   this.http.get('https://localhost:5270/fyp/users').subscribe({
  //     next: (response) => (this.users = response),
  //     error: (error) => console.log(error),
  //     complete: () => console.log('succesfully run'),
  //   });
  // }

  setCurrentUSer() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: MyUser = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
