import { Injectable } from '@angular/core';
import {Car} from '../shared/car';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>('http://localhost:3000/cars');
  }

  searchCars(search: Car): Observable<Car[]> {
    return this.http.post<Car[]>('http://localhost:3000/cars/search', search, this.httpOptions);
  }
}
