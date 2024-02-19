import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { MyUser } from '../_models/MyUser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'http://localhost:5270/fyp/';
  private currentUserSource = new BehaviorSubject<MyUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http : HttpClient) { }

  login(model : any)
  {
    return this.http.post<MyUser>(this.baseUrl + 'account/login', model).pipe(
      map((response: MyUser) =>{
        const user = response;
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(model : any)
  {
    return this.http.post<MyUser>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user : MyUser)
  {
    this.currentUserSource.next(user);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
