import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Terrain } from '../models/terrain.model';
import { TerrainsService } from '../services/terrains.service';

@Component({
  selector: 'app-terrain-list',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, CommonModule, MatPaginatorModule, MatSortModule],
  templateUrl: './terrain-list.component.html',
  styleUrl: './terrain-list.component.scss'
})
export class TerrainListComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  colonnes: string[] = ['nom', 'quantite', 'description','pointGeo','actions'];
  terrains = new MatTableDataSource<Terrain>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private terrainService: TerrainsService) { }

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
      }
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }



}