import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  API_URL = 'http://localhost:8080/api/v1';
  API_ENTITY_NAME = 'reservations';

  constructor(private readonly http: HttpClient) {
    
   }


  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.API_URL}/${this.API_ENTITY_NAME}`, reservation);
  }


  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }


  getReservationById(utilisateurId: number, terrainId: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.API_URL}/${this.API_ENTITY_NAME}/?utilisateurId=${utilisateurId}&terrainId=${terrainId}`);
  }


  updateReservation(utilisateurId: number, terrainId: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.API_URL}/${this.API_ENTITY_NAME}/${utilisateurId}/${terrainId}`, reservation);
  }


  deleteReservation(utilisateurId: number, terrainId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${this.API_ENTITY_NAME}/${utilisateurId}/${terrainId}`);
  }

}
