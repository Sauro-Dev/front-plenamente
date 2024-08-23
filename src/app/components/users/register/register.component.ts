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

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService
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
  }

  toggleAdmin(): void {
    this.isAdminSelected = !this.isAdminSelected;
    this.registerForm.patchValue({ isAdmin: this.isAdminSelected });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      let finalRole = formValue.role;

      if (this.isAdminSelected && this.selectedRole === 'Terapeuta') {
        finalRole = 'ADMIN';
      }

      formValue.role = finalRole;

      this.registerService.registerUser(formValue).subscribe(
        (response) => {
          console.log('Registro exitoso', response);
        },
        (error) => {
          console.error('Error al registrar', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }
}
