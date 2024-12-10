import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { TerrainFormComponent } from './terrain-form/terrain-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TerrainListComponent } from './terrain-list/terrain-list.component'

@NgModule({
  imports: [BrowserModule,TerrainFormComponent,FormsModule,ReactiveFormsModule, BrowserModule,],
  declarations: [TerrainFormComponent, TerrainListComponent],
  bootstrap: []
})
export class AppModule { }