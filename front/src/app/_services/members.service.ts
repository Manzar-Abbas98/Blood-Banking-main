import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { map, of, take } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { MyUser } from '../_models/MyUser';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MembersService {


  baseUrl = environment.apiURL;

  members: Member[] = [];

  memberCache = new Map();

  user: MyUser | undefined;

  userParams: UserParams | undefined;


  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.userParams = new UserParams(user);
          this.user = user;
        }
      }
    })
  }

  getUserParams()
  {
    return this.userParams;
  }

  setUserParams(params : UserParams)
  {
    this.userParams = params;
  }

  resetUserParams()
  {
    if(this.user)
    {
      this.userParams = new UserParams(this.user);
      return this.userParams;
    }
    return;
  }

  getMembers(UserParams: UserParams) {
    const response = this.memberCache.get(Object.values(UserParams).join('-'));

    if (response) return of(response);

    let params = getPaginationHeaders(UserParams.pageNumber, UserParams.pageSize);

    params = params.append('minAge', UserParams.minAge);
    params = params.append('maxAge', UserParams.maxAge);
    params = params.append('city', UserParams.city);
    params = params.append('bloodGroup', UserParams.bloodGroup);

    return getPaginatedResult<Member[]>(this.baseUrl + 'users', params, this.http).pipe(
      map(response => {
        this.memberCache.set(Object.values(UserParams).join('-'), response);
        return response;
      })
    )
  }

  

  getMember(email: string) {
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.email === email);

    if (member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + email);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member)
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {})
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  addRequest(email : string)
  {
    return this.http.post(this.baseUrl + 'request/' + email, {});
  }

  getRequest(predicate : string)
  {
    return this.http.get<Member[]>(this.baseUrl + 'request?predicate=' + predicate);
  }

  // getHttpOptions()
  // {
  //   const userString = localStorage.getItem('user');
  //   if(!userString) return;

  //   const user = JSON.parse(userString);
  //   return{
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + user.token
  //     })
  //   }
  // }
}
