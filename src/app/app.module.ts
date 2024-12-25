import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { NavbarComponent } from './navbar/navbar.component'
import { TerrainFormComponent } from './terrain-form/terrain-form.component'
import { TerrainListComponent } from './terrain-list/terrain-list.component'
import { AppComponent } from './app.component'
import { AppRouteModule } from './app.routes'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { JwtInterceptor } from '../utils/JwtInterceptor'
import { UserReservationsComponent } from './user-reservations/user-reservations.component'

@NgModule({
  imports: [BrowserModule,TerrainFormComponent,FormsModule,ReactiveFormsModule, BrowserModule, TerrainListComponent,NavbarComponent,AppRouteModule, MatSnackBarModule, UserReservationsComponent ],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppModule]
})
export class AppModule { }