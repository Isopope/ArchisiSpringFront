import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../models/reservation.model';
import { Terrain } from '../models/terrain.model';
import { AuthService } from '../services/auth.service';
import { ReservationsService } from '../services/reservations.service';
import { TerrainsService } from '../services/terrains.service';

@Component({
  selector: 'app-terrain-list',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, CommonModule, MatPaginatorModule, MatSortModule, MatSnackBarModule],
  templateUrl: './terrain-list.component.html',
  styleUrls: ['./terrain-list.component.scss'],
})
export class TerrainListComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  colonnes: string[] = ['nom', 'quantite', 'description', 'pointGeo', 'actions'];

  terrains = new MatTableDataSource<Terrain>([]);
  clickedRows = new Set<Terrain>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private terrainService: TerrainsService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    protected authService: AuthService,
    private reservationsService: ReservationsService
  ) {}

  ngAfterViewInit() {
    this.loadTerrains();
  }

  loadTerrains() {
    this.terrainService.getAllTerrains().subscribe({
      next: (terrains) => {
        this.terrains.data = terrains;
        this.terrains.paginator = this.paginator;
        this.terrains.sort = this.sort;
      },
      error: (err) => {
        console.error('Error loading terrains:', err);
      },
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deleteTerrain(id: number) {
    this.terrainService.deleteTerrain(id).subscribe({
      next: () => {
        this.snackBar.open('Terrain supprimé avec succès!', 'Fermer', {
          duration: 3000,
        });
        this.loadTerrains();
      },
      error: (err) => {
        this.snackBar.open('Échec de la suppression du terrain. Veuillez réessayer.', 'Fermer', {
          duration: 3000,
        });
        console.error('Error deleting terrain:', err);
      },
    });
  }

  editTerrain(id: number) {
    this.router.navigate(['/terrains/', id]);
  }

  navigateToEdit(id: number) {
    this.router.navigate(['/terrains', id]);
  }

  reserveTerrain(utilisateurId: number, terrainId: number) {
    const reservationDTO: Reservation = {
      utilisateurId: utilisateurId,
      terrainId: terrainId,
      reservation: 1, 
    };

    this.reservationsService.createReservation(reservationDTO).subscribe({
      next: (response) => {
        console.log('Réservation créée avec succès:', response);
        this.snackBar.open('Réservation créée avec succès!', 'Fermer', {
          duration: 3000,
        });

      },
      error: (error) => {
        console.error('Erreur lors de la création de la réservation:', error);
        this.snackBar.open('Erreur lors de la création de la réservation', 'Fermer', {
          duration: 3000,
        });

      }
    });
  }
}
