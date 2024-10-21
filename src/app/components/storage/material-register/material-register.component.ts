import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { StorageService } from '../storage.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './material-register.component.html',
  styleUrls: ['./material-register.component.css'],
})
export class MaterialRegisterComponent {
  registerForm: FormGroup;
  estados: string[] = ['NUEVO', 'BUENO', 'REGULAR', 'DESGASTADO', 'ROTO'];

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      estado: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      esCompleto: [false],
      esSoporte: [false],
      descripcion: [''],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      this.storageService.registerMaterial(formValue).subscribe(
        (response) => {
          alert('Material registrado exitosamente');
          this.router.navigate(['/storage']);
        },
        (error) => {
          console.error('Error al registrar el material', error);
          alert('Hubo un error al registrar el material');
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  onCancel(): void {
    const confirmCancel = confirm('¿Estás seguro de que deseas cancelar el registro?');
    if (confirmCancel) {
      this.registerForm.reset();
      this.router.navigate(['/storage']);
    }
  }
}
