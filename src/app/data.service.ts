import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';

// Interface for type safety - always define your data structures
export interface Transaction {
  id: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);

  // Simulated API call with delay to mimic real server
  getTransactions(): Observable<Transaction[]> {
    const mockTransactions: Transaction[] = [
      { id: 'ORD-001', customer: 'John Smith', amount: 245, status: 'completed', date: '2024-01-15' },
      { id: 'ORD-002', customer: 'Sarah Johnson', amount: 189, status: 'pending', date: '2024-01-15' },
      { id: 'ORD-003', customer: 'Mike Davis', amount: 324, status: 'completed', date: '2024-01-14' },
      { id: 'ORD-004', customer: 'Emily Wilson', amount: 156, status: 'failed', date: '2024-01-14' },
      { id: 'ORD-005', customer: 'Chris Brown', amount: 278, status: 'completed', date: '2024-01-13' },
      { id: 'ORD-006', customer: 'Lisa Anderson', amount: 412, status: 'completed', date: '2024-01-12' },
      { id: 'ORD-007', customer: 'David Miller', amount: 198, status: 'pending', date: '2024-01-12' }
    ];
    
    return of(mockTransactions).pipe(delay(800)); // Simulated network delay
  }

  getRevenueData(): Observable<any> {
    const revenueData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue 2024',
          data: [65000, 79000, 82000, 91000, 105000, 124000],
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66, 165, 245, 0.1)',
          fill: true
        }
      ]
    };
    return of(revenueData).pipe(delay(600));
  }
}