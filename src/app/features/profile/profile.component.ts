import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ComplaintService } from '../../core/services/complaint.service';
import { Complaint } from '../../shared/models/complaint.model';
import { User } from '../../shared/models/user.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h1>Profile</h1>
      <div *ngIf="user$ | async as user">
        <h2>Profile Details</h2>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .error {
      color: red;
      font-size: 0.8em;
    }
    form div {
      margin-bottom: 10px;
    }
  `]
})
export class ProfileComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(
    private authService: AuthService
  ) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
  }

  getInitials(name: string): string {
    if (!name) return '';
    const names = name.split(' ');
    const initials = names.map(n => n.charAt(0).toUpperCase());
    return initials.join('');
  }
}
