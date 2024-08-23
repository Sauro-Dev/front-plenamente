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
        adminPassword: ['', Validators.required],
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
    this.selectedRole = role;
    this.registerForm.patchValue({ role: role });

    if (role === 'Terapeuta') {
      this.registerForm.patchValue({ paymentPerSession: null });
    } else if (role === 'Secretario/a') {
      this.registerForm.patchValue({ paymentPerMonth: null });
    }
  }

  toggleAdmin(): void {
    this.isAdminSelected = !this.isAdminSelected;
    this.registerForm.patchValue({ isAdmin: this.isAdminSelected });
  }

  promptAdminPassword(event: MouseEvent): void {
    if (event) {
      event.preventDefault();
    }

    this.showAdminDialog = true;
  }

  confirmAdminPassword(): void {
    const adminPassword = this.registerForm.get('adminPassword')?.value;

    if (adminPassword === 'admin123') {
      this.isAdminSelected = true;
      this.registerForm.patchValue({ isAdmin: true });
      this.showAdminDialog = false;
    } else {
      alert('Contraseña incorrecta');
    }
  }

  cancelAdminDialog(): void {
    this.showAdminDialog = false;
    this.isAdminSelected = false;
    this.registerForm.patchValue({ isAdmin: false });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const confirmed = window.confirm(
        '¿Estás seguro de que deseas guardar este registro?'
      );

      if (confirmed) {
        const formValue = this.registerForm.value;

        let finalRole = formValue.role;

        if (this.isAdminSelected && this.selectedRole === 'Terapeuta') {
          finalRole = 'ADMIN';
        }

        formValue.role = finalRole;

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
