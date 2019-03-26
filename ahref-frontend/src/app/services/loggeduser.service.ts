import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class LoggeduserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getLoggedUser(): Observable<User> {
    return this.http.get<User>('http://localhost:3000/loggedUser');
  }

  saveChanges(changes: User): Observable<boolean> {
    return this.http.put<boolean>('http://localhost:3000/loggedUser', changes, this.httpOptions);
  }
}
