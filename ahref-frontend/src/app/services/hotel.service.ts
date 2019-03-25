import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Hotel} from '../shared/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  constructor(private http: HttpClient) { }

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>('http://localhost:3000/hotels');
  }

  getHotel(id: string): Observable<Hotel> {
    return this.http.get<Hotel>('http://localhost:3000/hotels/' + id );
  }

  editHotel(id: string, changes: Hotel): Observable<boolean> {
    return this.http.put<boolean>('http://localhost:3000/hotels/' + id, changes);
  }

  addHotel(new_hotel: Hotel): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:3000/hotels', new_hotel);
  }
}
