import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2 class="auth-title">Login</h2>
          <p class="auth-subtitle">Welcome back! Please login to your account.</p>
        </div>
        
        <div *ngIf="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="auth-form">
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
            </div>
          </div>
          
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="rememberMe">
            <label class="form-check-label" for="rememberMe">Remember me</label>
          </div>
          
          <button type="submit" class="btn btn-primary btn-block" [disabled]="loading">
            <span *ngIf="loading" class="spinner-border spinner-border-sm mr-1"></span>
            Login
          </button>
        </form>
        
        <div class="auth-footer">
          <p>Don't have an account? <a routerLink="/register">Register</a></p>
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
      align-items: center;
    }
    
    .form-check-input {
      margin-right: 8px;
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
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  returnUrl: string = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // Redirect if already logged in
    if (localStorage.getItem('token')) {
      this.router.navigate(['']);
    }
    
    // Initialize form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
    // Get return url from route parameters or default to ''
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }
  
  // Convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  
  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    
    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
      this.authService.login(
        this.f['email'].value,
        this.f['password'].value
      ).subscribe({
        next: (response) => {
          console.log('Login successful, response:', response);
          this.router.navigate([this.returnUrl]).then(() => {
            window.location.reload();
          });
        },
        error: error => {
          this.errorMessage = error.error?.message || 'Login failed. Please check your credentials.';
          this.loading = false;
          console.error('Login error:', error);
        }
      });
  }
}