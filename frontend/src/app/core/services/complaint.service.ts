import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Complaint } from '../../shared/models/complaint.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiUrl = `${environment.apiUrl}/complaints`;
  
  constructor(private http: HttpClient) { }
  
  // Get all complaints (with optional filters)
  getComplaints(filters?: any): Observable<Complaint[]> {
    let queryParams = '';
    
    if (filters) {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.category) params.append('category', filters.category);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.search) params.append('search', filters.search);
      
      queryParams = `?${params.toString()}`;
    }
    
    return this.http.get<Complaint[]>(`${this.apiUrl}${queryParams}`);
  }
  
  // Get complaint by ID
  getComplaint(id: string): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.apiUrl}/${id}`);
  }
  
  // Create new complaint
  createComplaint(complaint: Complaint): Observable<Complaint> {
    return this.http.post<Complaint>(this.apiUrl, complaint);
  }
  
  // Update complaint
  updateComplaint(id: string, complaint: Partial<Complaint>): Observable<Complaint> {
    return this.http.put<Complaint>(`${this.apiUrl}/${id}`, complaint);
  }
  
  // Delete complaint
  deleteComplaint(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
  // Add comment to complaint
  addComment(id: string, text: string): Observable<Complaint> {
    return this.http.post<Complaint>(`${this.apiUrl}/${id}/comment`, { text });
  }
  
  // Get complaint statistics (for admin dashboard)
  getStatistics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats/overview`);
  }
}