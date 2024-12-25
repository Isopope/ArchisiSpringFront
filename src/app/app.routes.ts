import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TerrainFormComponent } from './terrain-form/terrain-form.component';
import { TerrainListComponent } from './terrain-list/terrain-list.component';
import { NgModule } from '@angular/core';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent }, 
    {path:'mesreservations', component:UserReservationsComponent},
    { path: 'home', redirectTo: '', pathMatch: 'full' }, 
    { path: 'terrains', component: TerrainListComponent },
    { path: 'terrain/new', component: TerrainFormComponent },
    { path: 'terrains/:id', component: TerrainFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: '' }, 
    
  
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouteModule{}


