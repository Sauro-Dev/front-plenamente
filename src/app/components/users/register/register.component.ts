import { Component } from '@angular/core';
import { RegisterService } from './register.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  selectedRole: string | null = null;
  isAdminSelected: boolean = false;

  showAdminDialog: boolean = false;
  adminPassword: string = '';

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        name: ['', Validators.required],
        lastNamePaterno: ['', Validators.required],
        lastNameMaterno: ['', Validators.required],
        dni: ['', [Validators.required, Validators.pattern('\\d{8}')]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required],
        birthdate: ['', Validators.required],
        phone: ['', Validators.required],
        backupPhone: ['', Validators.required],
        role: ['', Validators.required],
        isAdmin: [false],
        paymentPerSession: [null],
        paymentPerMonth: [null],
        adminPassword: [''],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { passwordsDontMatch: true }
      : null;
  }

  selectRole(role: string): void {
    let backendRole: string;

    if (role === 'Terapeuta') {
      backendRole = 'THERAPIST';
    } else if (role === 'Secretario/a') {
      backendRole = 'SECRETARY';
    } else if (role === 'Admin') {
      backendRole = 'ADMIN';
    } else {
      backendRole = '';
    }

    this.selectedRole = role;
    this.registerForm.patchValue({ role: backendRole });

    this.registerForm.get('paymentPerSession')?.clearValidators();
    this.registerForm.get('paymentPerMonth')?.clearValidators();

    if (role === 'Terapeuta') {
      this.registerForm
        .get('paymentPerSession')
        ?.setValidators([Validators.required, Validators.min(1)]);
    } else if (role === 'Secretario/a') {
      this.registerForm
        .get('paymentPerMonth')
        ?.setValidators([Validators.required, Validators.min(1)]);
    }

    this.registerForm.get('paymentPerSession')?.updateValueAndValidity();
    this.registerForm.get('paymentPerMonth')?.updateValueAndValidity();

    // Limpiar validadores de la contraseña de admin cuando se selecciona un rol que no es Admin
    this.registerForm.get('adminPassword')?.clearValidators();
    this.registerForm.get('adminPassword')?.updateValueAndValidity();
  }

  promptAdminPassword(event: MouseEvent): void {
    if (event) {
      event.preventDefault();
    }

    this.registerForm
      .get('adminPassword')
      ?.setValidators([Validators.required]);
    this.registerForm.get('adminPassword')?.updateValueAndValidity();

    this.showAdminDialog = true;
  }

  confirmAdminPassword(): void {
    const adminPassword = this.registerForm.get('adminPassword')?.value;

    if (adminPassword === 'admin123') {
      this.isAdminSelected = true;
      this.registerForm.patchValue({ isAdmin: true });
      this.showAdminDialog = false;

      this.registerForm.get('adminPassword')?.clearValidators();
      this.registerForm.get('adminPassword')?.updateValueAndValidity();
    } else {
      alert('Contraseña incorrecta');
    }
  }

  cancelAdminDialog(): void {
    this.showAdminDialog = false;
    this.isAdminSelected = false;
    this.registerForm.patchValue({ isAdmin: false });

    this.registerForm.get('adminPassword')?.clearValidators();
    this.registerForm.get('adminPassword')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const confirmed = window.confirm(
        '¿Estás seguro de que deseas guardar este registro?'
      );

      if (confirmed) {
        const formValue = this.registerForm.value;

        // Depuración: Imprimir los valores antes de enviar al backend
        console.log('Formulario antes del envío:', formValue);

        // Asignar valores por defecto si son nulos
        if (this.selectedRole === 'Terapeuta') {
          formValue.paymentPerSession = formValue.paymentPerSession
            ? parseFloat(formValue.paymentPerSession)
            : 0.0;
          formValue.paymentPerMonth = 0.0; // Asegurar que el campo tenga un valor numérico, no null
        } else if (this.selectedRole === 'Secretario/a') {
          formValue.paymentPerMonth = formValue.paymentPerMonth
            ? parseFloat(formValue.paymentPerMonth)
            : 0.0;
          formValue.paymentPerSession = 0.0; // Asegurar que el campo tenga un valor numérico, no null
        } else {
          formValue.paymentPerSession = 0.0; // Valor por defecto si no es Terapeuta
          formValue.paymentPerMonth = 0.0; // Valor por defecto si no es Secretario/a
        }

        // Depuración: Imprimir los valores después de asignar los predeterminados
        console.log(
          'Formulario después de asignar valores por defecto:',
          formValue
        );

        // Enviar el formulario al backend
        this.registerService.registerUser(formValue).subscribe(
          (response) => {
            console.log('Registro exitoso', response);
            this.router.navigate(['/users']);
          },
          (error) => {
            console.error('Error al registrar', error);
          }
        );
      }
    } else {
      console.error('Formulario inválido');
    }
  }

  onCancel(): void {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas cancelar el registro?'
    );

    if (confirmed) {
      this.router.navigate(['/users']);
    }
  }
}
