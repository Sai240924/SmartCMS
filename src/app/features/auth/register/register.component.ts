import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2 class="auth-title">Create an Account</h2>
          <p class="auth-subtitle">Fill in the form below to register</p>
        </div>
        
        <div *ngIf="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="auth-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              formControlName="name" 
              class="form-control"
              [ngClass]="{'is-invalid': submitted && f['name'].errors}"
            >
            <div *ngIf="submitted && f['name'].errors" class="invalid-feedback">
              <div *ngIf="f['name'].errors['required']">Name is required</div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email" 
              class="form-control"
              [ngClass]="{'is-invalid': submitted && f['email'].errors}"
            >
            <div *ngIf="submitted && f['email'].errors" class="invalid-feedback">
              <div *ngIf="f['email'].errors['required']">Email is required</div>
              <div *ngIf="f['email'].errors['email']">Email must be a valid email address</div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password" 
              class="form-control"
              [ngClass]="{'is-invalid': submitted && f['password'].errors}"
            >
            <div *ngIf="submitted && f['password'].errors" class="invalid-feedback">
              <div *ngIf="f['password'].errors['required']">Password is required</div>
              <div *ngIf="f['password'].errors['minlength']">Password must be at least 6 characters</div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              formControlName="confirmPassword" 
              class="form-control"
              [ngClass]="{'is-invalid': submitted && f['confirmPassword'].errors}"
            >
            <div *ngIf="submitted && f['confirmPassword'].errors" class="invalid-feedback">
              <div *ngIf="f['confirmPassword'].errors['required']">Confirm Password is required</div>
              <div *ngIf="f['confirmPassword'].errors['mustMatch']">Passwords must match</div>
            </div>
          </div>
          
          <div class="form-group form-check">
            <input 
              type="checkbox" 
              id="terms" 
              formControlName="terms" 
              class="form-check-input"
              [ngClass]="{'is-invalid': submitted && f['terms'].errors}"
            >
            <label class="form-check-label" for="terms">
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </label>
            <div *ngIf="submitted && f['terms'].errors" class="invalid-feedback">
              <div *ngIf="f['terms'].errors['required']">You must agree to the terms</div>
            </div>
          </div>
          
          <button type="submit" class="btn btn-primary btn-block" [disabled]="loading">
            <span *ngIf="loading" class="spinner-border spinner-border-sm mr-1"></span>
            Register
          </button>
        </form>
        
        <div class="auth-footer">
          <p>Already have an account? <a routerLink="/login">Login</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 180px);
      padding: 32px 16px;
    }
    
    .auth-card {
      width: 100%;
      max-width: 450px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      padding: 32px;
    }
    
    .auth-header {
      text-align: center;
      margin-bottom: 32px;
    }
    
    .auth-title {
      font-size: 1.75rem;
      color: #333;
      margin-bottom: 8px;
    }
    
    .auth-subtitle {
      color: #666;
    }
    
    .auth-form {
      margin-bottom: 24px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-control {
      display: block;
      width: 100%;
      padding: 10px 12px;
      font-size: 1rem;
      line-height: 1.5;
      color: #495057;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      border-radius: 4px;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    
    .form-control:focus {
      border-color: #8c9eff;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(63, 81, 181, 0.25);
    }
    
    .is-invalid {
      border-color: #F44336;
    }
    
    .invalid-feedback {
      color: #F44336;
      font-size: 0.875rem;
      margin-top: 4px;
    }
    
    .form-check {
      display: flex;
      align-items: flex-start;
    }
    
    .form-check-input {
      margin-right: 8px;
      margin-top: 4px;
    }
    
    .btn-block {
      display: block;
      width: 100%;
      padding: 12px;
      font-size: 1rem;
      font-weight: 500;
      margin-top: 24px;
    }
    
    .auth-footer {
      text-align: center;
      margin-top: 24px;
      color: #666;
    }
    
    .auth-footer a {
      color: #3F51B5;
      font-weight: 500;
    }
    
    .spinner-border {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 0.2em solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spinner-border 0.75s linear infinite;
      margin-right: 8px;
    }
    
    @keyframes spinner-border {
      to { transform: rotate(360deg); }
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Redirect if already logged in
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
    }
    
    // Initialize form
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, {
      validators: this.mustMatch('password', 'confirmPassword')
    });
  }
  
  // Custom validator to check if password and confirm password match
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // Return if another validator has already found an error
        return;
      }

      // Set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  
  // Convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  
  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    
    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.authService.register(
      this.f['name'].value,
      this.f['email'].value,
      this.f['password'].value
    ).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }
}