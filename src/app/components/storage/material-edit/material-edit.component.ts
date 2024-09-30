import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { Material } from '../material';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Si es necesario
import { RouterModule } from '@angular/router'; // Si es necesario

@Component({
  selector: 'app-material-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule, // Si es necesario
    RouterModule // Si es necesario
  ],
  templateUrl: './material-edit.component.html',
  styleUrl: './material-edit.component.css'
})
export class MaterialEditComponent implements OnInit {
  material: Material | undefined;
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      estado: [''],
      stock: [0, [Validators.required, Validators.min(0)]],
      esCompleto: [false],
      esSoporte: [false],
      areaIntervencion: [''],
      ambiente: ['']
    });
  }

  ngOnInit(): void {
    const idMaterial = this.route.snapshot.paramMap.get('idMaterial');
    if (idMaterial) {
      this.storageService.getMaterialById(idMaterial).subscribe((material) => {
        this.material = material;
        this.editForm.patchValue(material);
      });
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedMaterial = { ...this.material, ...this.editForm.value };
      this.storageService.updateMaterial(updatedMaterial).subscribe(
        () => {
          this.router.navigate(['/storage']);
        },
        (error) => {
          console.error('Error al actualizar el material:', error);
          // Aquí puedes manejar el error, mostrando un mensaje al usuario si es necesario.
        }
      );
    }
  }
}
