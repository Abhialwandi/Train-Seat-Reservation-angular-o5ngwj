import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private apiUrl = 'http://localhost:3000/seats'; // Your backend API URL

  constructor(private http: HttpClient) {}

  // Method to get all seats
  getSeats(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Method to reserve a seat (you can expand this as needed)
  reserveSeat(seatId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reserve`, { id: seatId });
  }
}
