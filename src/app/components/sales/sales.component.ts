import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SalesService, Sale } from '../../services/sales.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  sales: Sale[] = [];
  newSale: Sale = {
    product: '',
    amount: 0,
    date: '',
    region: '',
    salesperson: ''
  };
  loading = false;
  error = '';

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.loading = true;
    this.salesService.getSales().subscribe({
      next: (data) => {
        this.sales = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading sales data';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  addSale(): void {
    if (!this.newSale.product || !this.newSale.date || !this.newSale.region || !this.newSale.salesperson) {
      this.error = 'Please fill all required fields';
      return;
    }

    this.loading = true;
    this.salesService.createSale(this.newSale).subscribe({
      next: (sale) => {
        this.sales.unshift(sale);
        this.resetForm();
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error adding sale';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  resetForm(): void {
    this.newSale = {
      product: '',
      amount: 0,
      date: '',
      region: '',
      salesperson: ''
    };
    this.error = '';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  get totalSales(): number {
    return this.sales.reduce((total, sale) => total + sale.amount, 0);
  }
}