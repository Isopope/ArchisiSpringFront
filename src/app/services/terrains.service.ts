import { Injectable } from '@angular/core';
import { Terrain } from '../models/terrain.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TerrainsService {

  API_URL = 'http://localhost:8080/api/v1';
  API_ENTITY_NAME = 'terrains';

  constructor(private readonly http: HttpClient) { }


  createTerrain(terrain: Terrain): Observable<Terrain> {
    return this.http.post<Terrain>(`${this.API_URL}/${this.API_ENTITY_NAME}`, terrain);
  }


  getAllTerrains(): Observable<Terrain[]> {
    return this.http.get<Terrain[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }


  getTerrainById(id: number): Observable<Terrain> {
    return this.http.get<Terrain>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
  }


  updateTerrain(id: number, terrain: Terrain): Observable<Terrain> {
    return this.http.put<Terrain>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`, terrain);
  }


  deleteTerrain(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
  }
  
}
