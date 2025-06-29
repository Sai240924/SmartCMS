import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintService } from '../../core/services/complaint.service';
import { Complaint } from '../../shared/models/complaint.model';
import { User } from '../../shared/models/user.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-complaint-submission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h1>Submit Complaint</h1>
      <form [formGroup]="complaintForm" (ngSubmit)="onSubmit()">
        <div>
          <label for="title">Title:</label>
          <input id="title" formControlName="title" placeholder="Example: Late delivery of product" />
          <div *ngIf="complaintForm.get('title')?.invalid && complaintForm.get('title')?.touched" class="error">
            Title is required.
          </div>
        </div>

        <div>
          <label for="description">Description:</label>
          <textarea id="description" formControlName="description" placeholder="Example: The product was delivered 5 days late, causing inconvenience."></textarea>
          <div *ngIf="complaintForm.get('description')?.invalid && complaintForm.get('description')?.touched" class="error">
            Description is required.
          </div>
        </div>

        <div>
          <label for="category">Category:</label>
          <select id="category" formControlName="category">
            <option value="">Select category</option>
            <option value="Product">Product (e.g., defective item)</option>
            <option value="Service">Service (e.g., poor customer support)</option>
            <option value="Billing">Billing (e.g., incorrect charge)</option>
            <option value="Technical">Technical (e.g., website error)</option>
            <option value="Other">Other</option>
          </select>
          <div *ngIf="complaintForm.get('category')?.invalid && complaintForm.get('category')?.touched" class="error">
            Category is required.
          </div>
        </div>

        <div>
          <label for="priority">Priority:</label>
          <select id="priority" formControlName="priority">
            <option value="">Select priority</option>
            <option value="Low">Low (e.g., minor issue)</option>
            <option value="Medium">Medium (e.g., moderate impact)</option>
            <option value="High">High (e.g., urgent attention needed)</option>
            <option value="Critical">Critical (e.g., system down)</option>
          </select>
          <div *ngIf="complaintForm.get('priority')?.invalid && complaintForm.get('priority')?.touched" class="error">
            Priority is required.
          </div>
        </div>

        <button type="submit" [disabled]="complaintForm.invalid">Submit Complaint</button>
      </form>

      <h2>Your Complaints</h2>
      <ul>
        <li *ngFor="let complaint of complaints">
          <strong>{{ complaint.title }}</strong> - {{ complaint.status }} - {{ complaint.priority }}
          <p>{{ complaint.description }}</p>
        </li>
      </ul>
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
export class ComplaintSubmissionComponent implements OnInit {
  complaints: Complaint[] = [];
  complaintForm: FormGroup;
  user$: Observable<User | null>;

  constructor(
    private complaintService: ComplaintService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.user$ = this.authService.currentUser$;
    this.complaintForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.complaintService.getComplaints({}).subscribe(complaints => {
          this.complaints = complaints.filter(c => {
            if (typeof c.userId === 'string') {
              return c.userId === user.id;
            } else if (c.userId && typeof c.userId === 'object') {
              return c.userId.id === user.id;
            }
            return false;
          });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.complaintForm.valid) {
      this.user$.subscribe(user => {
        if (user) {
          const newComplaint: Complaint = {
            ...this.complaintForm.value,
            status: 'New',
            userId: user.id
          };
          this.complaintService.createComplaint(newComplaint).subscribe({
            next: created => {
              this.complaints.push(created);
              this.complaintForm.reset();
            },
            error: err => {
              console.error('Error creating complaint:', err);
              if (err.error && err.error.message) {
                alert('Failed to submit complaint: ' + err.error.message);
              } else {
                alert('Failed to submit complaint. Please try again.');
              }
            }
          });
        }
      });
    }
  }
}
