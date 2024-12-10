import { Routes } from '@angular/router';
import { TerrainFormComponent } from './terrain-form/terrain-form.component';
import { TerrainListComponent } from './terrain-list/terrain-list.component';

export const routes: Routes = [
    { path: 'terrains', component: TerrainListComponent },
    { path: 'terrain/new', component: TerrainFormComponent },
    { path: 'terrains/:id', component: TerrainFormComponent },
    { path: '**', redirectTo: 'terrains' },
];


