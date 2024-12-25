import { Component, inject, ViewChild } from '@angular/core';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ReservationsService } from '../services/reservations.service';
import { Reservation } from '../models/reservation.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-reservations',
  standalone: true,
  imports: [MatButtonModule,MatPaginatorModule,MatTableModule, CommonModule, MatSortModule, MatSnackBarModule],
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.scss']
})
export class UserReservationsComponent {
cancelReservation(reservation: Reservation) {
  this.reservationsService.deleteReservation(reservation.utilisateurId, reservation.terrainId).subscribe({
    next: () => {
      this.snackBar.open('Reservation supprimé avec succès!', 'Fermer', {
        duration: 3000,
      });
      this.loadReservations();
    },
    error: (err) => {
      this.snackBar.open('Échec de la suppression de la Reservation. Veuillez réessayer.', 'Fermer', {
        duration: 3000,
      });
      console.error('Error deleting Reservation:', err);
    },
  });;

}
  private _liveAnnouncer = inject(LiveAnnouncer);
  colonnes: string[] = ['terrainId', 'reservation', 'actions'];

  reservations = new MatTableDataSource<Reservation>([]);
  clickedRows = new Set<Reservation>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private reservationsService: ReservationsService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngAfterViewInit() {
    this.loadReservations();
    
  }

  loadReservations() {
    const userId = this.authService.getUserId();

    if (userId) {
      this.reservationsService.getReservationByUtilisateur(userId).subscribe({
        next: (reservations) => {
          this.reservations.data = reservations;
          this.reservations.paginator = this.paginator;
          this.reservations.sort = this.sort;
        },
        error: (err) => {
          console.error('Error loading reservations:', err);
          this.snackBar.open('Erreur lors du chargement des réservations.', 'Fermer', {
            duration: 3000,
          });
        },
      });
    } else {
      this.snackBar.open('Utilisateur non authentifié.', 'Fermer', {
        duration: 3000,
      });
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
