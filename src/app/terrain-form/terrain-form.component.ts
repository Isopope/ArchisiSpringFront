import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { Terrain } from '../models/terrain.model';
import { TerrainsService } from '../services/terrains.service';

@Component({
  selector: 'app-terrain-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,MatFormFieldModule, ],
  templateUrl: './terrain-form.component.html',
  styleUrl: './terrain-form.component.scss'
})
export class TerrainFormComponent implements OnInit {
  terrainForm: FormGroup;
  isEditMode: boolean = false; // Détermine si nous sommes en mode édition
  terrainId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private terrainService: TerrainsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.terrainForm = this.fb.group({
      nom: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      pointGeo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.terrainId = +id;
        this.loadTerrain(this.terrainId);
      }
    });
  }

  loadTerrain(id: number): void {
    this.terrainService.getTerrainById(id).subscribe({
      next: (terrain) => {
        this.terrainForm.patchValue({
          nom: terrain.nom,
          quantite: terrain.quantite,
          description: terrain.description,
          pointGeo: terrain.pointGeo,
        });
      },
      error: (err) => {
        console.error('Error loading terrain:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.terrainForm.valid) {
      const terrainData: Terrain = this.terrainForm.value;

      if (this.isEditMode && this.terrainId) {
        this.terrainService.updateTerrain(this.terrainId, terrainData).subscribe({
          next: () => {
            this.router.navigate(['/terrains']);
          },
          error: (err) => {
            console.error('Error updating terrain:', err);
          },
        });
      } else {
        this.terrainService.createTerrain(terrainData).subscribe({
          next: () => {
            this.router.navigate(['/terrains']);
          },
          error: (err) => {
            console.error('Error creating terrain:', err);
          },
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
  

}
