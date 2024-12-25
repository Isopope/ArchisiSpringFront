import { Component } from '@angular/core';
import { TerrainListComponent } from "../terrain-list/terrain-list.component";
import { MapComponent } from "../map/map.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [TerrainListComponent, MapComponent,CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
