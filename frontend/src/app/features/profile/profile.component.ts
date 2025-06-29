import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ComplaintService } from '../../core/services/complaint.service';
import { Complaint } from '../../shared/models/complaint.model';
import { User } from '../../shared/models/user.model';
import { ReactiveFormsModule } from '@angular/forms';
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

        <h2>Your Complaints</h2>
        <ul>
          <li *ngFor="let complaint of complaints">
            <strong>{{ complaint.title }}</strong> - {{ complaint.status }}
          </li>
        </ul>
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
  complaints: Complaint[] = [];

  constructor(
    private authService: AuthService,
    private complaintService: ComplaintService
  ) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.user$.subscribe(user => {
      if (user && user.id) {
        this.complaintService.getComplaints({ userId: user.id }).subscribe({
          next: (data) => {
            this.complaints = data;
          },
          error: (err) => {
            console.error('Error loading complaints:', err);
          }
        });
      }
    });
  }

  getInitials(name: string): string {
    if (!name) return '';
    const names = name.split(' ');
    const initials = names.map(n => n.charAt(0).toUpperCase());
    return initials.join('');
  }
}
