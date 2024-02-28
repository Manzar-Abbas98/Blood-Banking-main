import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { MyUser } from '../_models/MyUser';
import { environment } from 'src/environments/environment';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiURL;
  private currentUserSource = new BehaviorSubject<MyUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http : HttpClient, private presenceService: PresenceService) { }

  login(model : any)
  {
    return this.http.post<MyUser>(this.baseUrl + 'account/login', model).pipe(
      map((response: MyUser) =>{
        const user = response;
        if(user)
        {
          this.setCurrentUser(user);
          // localStorage.setItem('user', JSON.stringify(user));
          // this.currentUserSource.next(user);
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
          this.setCurrentUser(user);
          // localStorage.setItem('user', JSON.stringify(user));
          // this.currentUserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user : MyUser)
  {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
    this.presenceService.createHubConnection(user);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presenceService.stopHubConnection();
  }
}
