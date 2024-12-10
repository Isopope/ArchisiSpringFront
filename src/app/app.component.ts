import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TerrainListComponent } from './terrain-list/terrain-list.component';
import { TerrainFormComponent } from './terrain-form/terrain-form.component';
import { RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatSlideToggleModule, TerrainListComponent,TerrainFormComponent,RouterModule, MapComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sArchitecture';
}
