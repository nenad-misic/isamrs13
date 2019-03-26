import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Airline} from '../shared/airline';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }


  getAirlines(): Observable<Airline[]> {
    return this.http.get<Airline[]>('http://localhost:3000/airports');
  }

  getAirline(id: string): Observable<Airline> {
    return this.http.get<Airline>('http://localhost:3000/airports/' + id);
  }

  saveChanges(id: string, changes: Airline): Observable<boolean> {
    return this.http.put<boolean>('http://localhost:3000/airports/' + id, changes, this.httpOptions);
  }
}
