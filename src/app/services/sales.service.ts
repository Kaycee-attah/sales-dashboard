import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Sale {
  _id?: string;
  product: string;
  amount: number;
  date: string;
  region: string;
  salesperson: string;
  createdAt?: string;
  updatedAt?: string;
}

// New interface to match backend response
interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = 'http://localhost:5000/api/sales'; 
  
  constructor(private http: HttpClient) { }

  // Get all sales - now extracts data from response
  getSales(): Observable<Sale[]> {
    return this.http.get<ApiResponse<Sale[]>>(this.apiUrl)
      .pipe(
        map(response => response.data)
      );
  }

  // Get single sale by ID
  getSale(id: string): Observable<Sale> {
    return this.http.get<ApiResponse<Sale>>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response.data)
      );
  }

  // Create new sale
  createSale(sale: Sale): Observable<Sale> {
    return this.http.post<ApiResponse<Sale>>(this.apiUrl, sale)
      .pipe(
        map(response => response.data)
      );
  }

  // Update sale
  updateSale(id: string, sale: Sale): Observable<Sale> {
    return this.http.put<ApiResponse<Sale>>(`${this.apiUrl}/${id}`, sale)
      .pipe(
        map(response => response.data)
      );
  }

  // Delete sale
  deleteSale(id: string): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response.data)
      );
  }
}