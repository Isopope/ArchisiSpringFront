import { Injectable } from '@angular/core';
import { UtilisateursService } from './utilisateurs.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private utilisateursService: UtilisateursService) { }

  login(email: string, password: string): Observable<any> {
    return this.utilisateursService.login(email, password).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({
          userName: response.userName,
          userId: response.userId
        }));
        localStorage.setItem('expiresIn', response.expiresIn.toString());
      })
    );
  }

  register(user: any): Observable<any> {
    return this.utilisateursService.register(user);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): number  {
    try {
      const userJson = localStorage.getItem('user');
      if (!userJson) {
        console.warn('Utilisateur non trouvé dans le localStorage.');
        return -1; // Retourne null si la clé 'user' n'existe pas
      }
  
      const user = JSON.parse(userJson);
      if (!user || typeof user.userId !== 'number') {
        console.error('Utilisateur invalide ou ID utilisateur manquant.');
        return -3; // Retourne null si l'objet utilisateur ou l'ID est invalide
      }
  
      return user.userId;
    } catch (error) {
      console.error('Erreur lors de l’analyse du localStorage:', error);
      return -2; // Retourne null en cas d’erreur JSON
    }
  }
  
}
