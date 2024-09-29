import { MaterialRegisterService } from './material-register.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './material-register.component.html',
  styleUrl: './material-register.component.css',
})
export class MaterialRegisterComponent {
  materialForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private MaterialRegisterService: MaterialRegisterService,
    private router: Router
  ) {
    this.materialForm = this.fb.group(
      {
        username: [''],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        name: [''],
        lastNamePaterno: ['', Validators.required],
        lastNameMaterno: ['', Validators.required],
        dni: ['', [Validators.required, Validators.pattern('\\d{8}')]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^[a-zA-ZñÑ0-9._%+-]+@[a-zA-ZñÑ0-9.-]+\.[a-zA-Z]{2,4}$/
            ),
          ],
        ],
        address: [''],
        birthdate: ['', Validators.required],
        phone: ['', Validators.required],
        backupPhone: ['', Validators.required],
        role: ['', Validators.required],
        isAdmin: [false],
        paymentPerSession: [null],
        paymentPerMonth: [null],
        adminPassword: [''],
      },
    );
  }

  onSubmit():void{

  }
  onCancel():void{
    
  }
}
