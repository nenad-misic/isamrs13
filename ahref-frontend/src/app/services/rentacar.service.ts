import { Injectable } from '@angular/core';
import {RentACarService} from '../shared/rentacarservice';
import {Car} from '../shared/car';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentacarService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }


  getServices(): Observable<RentACarService[]> {
    return this.http.get<RentACarService[]>('http://localhost:3000/rentacars');
  }

  getService(id: string): Observable<RentACarService> {
    return this.http.get<RentACarService>('http://localhost:3000/rentacars/' + id);
  }

  saveChanges(id: string, changes: RentACarService): Observable<boolean> {
    return this.http.put<boolean>('http://localhost:3000/rentacars/' + id, changes, this.httpOptions);
  }
}
