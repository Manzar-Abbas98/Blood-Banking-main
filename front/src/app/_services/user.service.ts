import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/donors';
  constructor(private _http: HttpClient) {}

  addUser(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}`, data);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this._http.put(`${this.apiUrl}/${id}`, data);
  }

  getUserList(): Observable<any> {
    return this._http.get(`${this.apiUrl}`);
  }

  deleteUser(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`);
  }
}
