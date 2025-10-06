import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../theme.service';
import { DataService, Transaction } from '../../data.service';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // Angular Material
    MatFormFieldModule,
    MatInputModule, 
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    // Charts
    BaseChartDirective,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private dataService = inject(DataService);
  private themeService = inject(ThemeService);

  // Expose theme signal to template
  currentTheme = this.themeService.currentTheme;

  // Theme toggle method
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // Method to set specific theme
  setTheme(theme: 'light' | 'dark') {
    this.themeService.setTheme(theme);
  }

  recentTransactions = toSignal(this.dataService.getTransactions(), {
    initialValue: [] as Transaction[]
  });

  revenueChartData = toSignal(this.dataService.getRevenueData(), {
    initialValue: { labels: [], datasets: [] }
  });
  
  title = 'sales-dashboard';
  searchText = signal<string>('');

  filteredTransactions = computed(() => {
    const query = this.searchText().toLowerCase();
    const transactions = this.recentTransactions();
    
    if (!query) {
      return transactions;
    }
    return transactions.filter(transaction =>
      transaction.customer.toLowerCase().includes(query) ||
      transaction.id.toLowerCase().includes(query) ||
      transaction.status.toLowerCase().includes(query)
    );
  });

  onChartClick(event: any, chartType: string) {
    if (event.active.length > 0) {
      const index = event.active[0].index;
      let filterValue = '';

      if (chartType === 'region') {
        filterValue = this.regionChartData.labels[index];
        this.searchText.set(filterValue);
      }
    }
  }
  
  exportToCsv() {
    if (!this.filteredTransactions().length) {
      return;
    }

    const headers = ['Order ID', 'Customer', 'Amount', 'Status', 'Date'];
    const csvData = this.filteredTransactions().map(transaction => [
      transaction.id,
      `"${transaction.customer}"`,
      `$${transaction.amount}`,
      transaction.status,
      transaction.date
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  regionChartData = {
    labels: ['North', 'South', 'East', 'West', 'Central'],
    datasets: [
      {
        label: 'Sales by Region',
        data: [45000, 32000, 28000, 39000, 21000],
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
        ]
      }
    ]
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  displayedColumns: string[] = ['id', 'customer', 'amount', 'status', 'date'];
}