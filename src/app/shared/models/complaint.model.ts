import { User } from './user.model';

export interface Complaint {
  _id?: string;
  title: string;
  description: string;
  category: 'Product' | 'Service' | 'Billing' | 'Technical' | 'Other';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'New' | 'In Progress' | 'On Hold' | 'Resolved' | 'Closed';
  userId: string | User;
  assignedTo?: string | User | null;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  comments?: Array<{
    text: string;
    userId: string | User;
    createdAt: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
  resolvedAt?: string;
}

export interface ComplaintFilters {
  status?: string;
  category?: string;
  priority?: string;
  search?: string;
}

export interface ComplaintStatistics {
  totalComplaints: number;
  newComplaints: number;
  inProgressComplaints: number;
  resolvedComplaints: number;
  categoryStats: Array<{ _id: string; count: number }>;
  priorityStats: Array<{ _id: string; count: number }>;
  recentComplaints: Complaint[];
}