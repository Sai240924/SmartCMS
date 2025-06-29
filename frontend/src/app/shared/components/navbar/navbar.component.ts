import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a routerLink="/" class="logo">
            <span class="logo-text">Smart CMS</span>
          </a>
        </div>
        
        <div class="navbar-menu">
          <div class="navbar-end">
              <a 
                routerLink="/complaints" 
                routerLinkActive="active" 
                class="navbar-item"
              >
                Submit Complaint
              </a>
              <a 
                *ngIf="(isAdmin$ | async)" 
                routerLink="/admin" 
                routerLinkActive="active" 
                class="navbar-item admin-link"
              >
                Admin
              </a>
            <!-- Removed erroneous closing ng-container tag -->
            <div class="navbar-item dropdown" [class.is-active]="dropdownOpen">
              <button class="profile-button" aria-haspopup="true" aria-controls="dropdown-menu" [attr.aria-expanded]="dropdownOpen" (click)="toggleDropdown($event)">
                <ng-container *ngIf="(currentUser$ | async) as user; else defaultIcon">
                  <div class="profile-icon-circle" *ngIf="user && user.name; else defaultIcon">
                    {{ getInitials(user.name) }}
                  </div>
                </ng-container>
                <ng-template #defaultIcon>
                  <span class="profile-icon" aria-label="default profile icon" role="img">User</span>
                </ng-template>
              </button>
              <div id="dropdown-menu" class="dropdown-menu" *ngIf="dropdownOpen">
                <ng-container *ngIf="(isLoggedIn$ | async); else loggedOutMenu">
                  <a routerLink="/profile" routerLinkActive="active" class="dropdown-item" (click)="closeDropdown()">
                    Profile
                  </a>
                  <a (click)="logout(); closeDropdown()" class="dropdown-item logout">
                    Logout
                  </a>
                </ng-container>
                <ng-template #loggedOutMenu>
                  <span class="profile-icon" style="color: red; font-weight: bold;">Profile Button Visible</span>
                  <a routerLink="/login" routerLinkActive="active" class="dropdown-item" (click)="closeDropdown()">Login</a>
                  <a routerLink="/register" routerLinkActive="active" class="dropdown-item" (click)="closeDropdown()">Register</a>
                </ng-template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #3F51B5;
      color: white;
      padding: 8px 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .navbar-brand {
      display: flex;
      align-items: center;
    }
    
    .logo {
      display: flex;
      align-items: center;
      color: white;
      font-weight: 700;
      font-size: 1.5rem;
      text-decoration: none;
    }
    
    .logo-text {
      margin-left: 8px;
    }
    
    .navbar-menu {
      display: flex;
    }
    
    .navbar-end {
      display: flex;
      align-items: center;
    }
    
    .navbar-item {
      color: white;
      margin-left: 16px;
      padding: 8px 12px;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.2s;
    }
    
    .navbar-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
      text-decoration: none;
    }
    
    .navbar-item.active {
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    .register {
      background-color: #FFC107;
      color: black;
      padding: 8px 16px;
    }
    
    .register:hover {
      background-color: #FFA000;
    }
    
    .admin-link {
      background-color: #F44336;
    }
    
    .admin-link:hover {
      background-color: #D32F2F;
    }
    
    .dropdown {
      position: relative;
      cursor: pointer;
    }
    
    .profile-button {
      background: none;
      border: none;
      cursor: pointer;
      color: white;
      font-size: 1.5rem;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      transition: background-color 0.2s;
    }
    
    .profile-button:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .profile-icon {
      pointer-events: none;
      font-size: 1.5rem;
      display: inline-block;
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      vertical-align: middle;
    }
    .profile-icon-circle {
      width: 32px;
      height: 32px;
      background-color: #FFC107;
      color: black;
      font-size: 1rem;
      font-weight: 700;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
    }
    
    .dropdown-menu {
      position: absolute;
      top: 48px;
      right: 0;
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      min-width: 120px;
      z-index: 10;
      display: flex;
      flex-direction: column;
    }
    
    .dropdown-item {
      padding: 8px 16px;
      color: #333;
      text-decoration: none;
      transition: background-color 0.2s;
    }
    
    .dropdown-item:hover {
      background-color: #f5f5f5;
    }
    
    .dropdown-item.active {
      background-color: #e0e0e0;
    }
    
    .logout {
      color: #F44336;
    }
    
    .logout:hover {
      background-color: #FFEBEE;
    }

    .highlight-profile {
      background-color: #FFC107;
      font-weight: 700;
      color: black;
      border-radius: 4px;
      padding: 8px 12px;
      transition: background-color 0.2s;
    }

    .highlight-profile:hover {
      background-color: #FFA000;
      color: black;
      text-decoration: none;
    }
    
    @media (max-width: 768px) {
      .navbar-menu {
        position: fixed;
        top: 56px;
        left: -100%;
        width: 80%;
        height: calc(100vh - 56px);
        background-color: white;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        transition: left 0.3s ease;
      }
      
      .navbar-menu.is-active {
        left: 0;
      }
      
      .navbar-end {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .navbar-item {
        color: #333;
        margin: 0;
        padding: 16px;
        width: 100%;
        border-radius: 0;
        border-bottom: 1px solid #f1f1f1;
      }
      
      .dropdown-menu {
        position: static;
        box-shadow: none;
        border-radius: 0;
        margin-top: 0;
        display: block;
        padding-left: 16px;
      }
      
      .dropdown:hover .dropdown-menu {
        animation: none;
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;
  currentUser$!: Observable<User | null>;
  dropdownOpen = false;
  
  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.isAdmin$ = this.authService.isAdmin();
    this.currentUser$ = this.authService.currentUser$;
  }
  
  logout(): void {
    this.authService.logout();
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
  }

  getInitials(name: string): string {
    if (!name) return '';
    const names = name.split(' ');
    const initials = names.map(n => n.charAt(0).toUpperCase());
    return initials.join('');
  }
}
