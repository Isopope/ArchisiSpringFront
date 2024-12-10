import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { Terrain } from '../models/terrain.model';
import { TerrainsService } from '../services/terrains.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  private map: any;

  private initMap(){
    this.map=L.map('map',{
      center:[47.3766733512, 0.6990401446],
      zoom: 13
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  private loadTerrainsOnMap(): void {
    this.terrainService.getAllTerrains().subscribe({
      next: (terrains: Terrain[]) => {
        terrains.forEach((terrain) => {
          const [lat, lng] = terrain.pointGeo.split(',').map(coord => parseFloat(coord.trim()));

          L.marker([lat, lng]).addTo(this.map!)
            .bindPopup(`<b>${terrain.nom}</b><br>${terrain.description}`);
        });
      },
      error: (err) => {
        console.error('Error loading terrains on map:', err);
      }
    });
  }
  constructor(private terrainService: TerrainsService){

  }
  ngAfterViewInit(): void {
    this.initMap()
    this.loadTerrainsOnMap()
  }
 
}
