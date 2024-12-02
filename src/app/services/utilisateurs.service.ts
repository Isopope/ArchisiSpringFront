import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UtilisateursService {

    API_URL = "http://localhost:8080/api/v1";
    API_ENTITY_NAME: string = "utilisateurs";
    constructor(private readonly http: HttpClient) { }

    createUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
        return this.http.post<Utilisateur>(`${this.API_URL}/${this.API_ENTITY_NAME}`, utilisateur);
    }

    getAllUtilisateurs(): Observable<Utilisateur[]> {
        return this.http.get<Utilisateur[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
    }

    getOneUtilisateur(id: number): Observable<Utilisateur> {
        return this.http.get<Utilisateur>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
    }

    updateUtilisateur(id: number, utilisateur: Utilisateur): Observable<Utilisateur> {
        return this.http.put<Utilisateur>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`, utilisateur);
    }

    deleteUtilisateur(id: number, utilisateur: Utilisateur): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
    }

}
