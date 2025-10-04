import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ThemeService } from './theme.service'

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

import { DataService, Transaction } from './data.service';

// Add this import:
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
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
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
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
    const transactions = this.recentTransactions(); // Now a signal
    
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
    // event.active[0] contains the clicked element's index
    if (event.active.length > 0) {
      const index = event.active[0].index;
      let filterValue = '';

      if (chartType === 'region') {
        // Get the region name from the labels array
        filterValue = this.regionChartData.labels[index];
        this.searchText.set(filterValue); // Set the search text to the region
      }
      
    }
  }
  
  exportToCsv() {
    if (!this.filteredTransactions().length) {
      return; // Don't do anything if there's no data
    }

    // Define CSV headers
    const headers = ['Order ID', 'Customer', 'Amount', 'Status', 'Date'];
    const csvData = this.filteredTransactions().map(transaction => [
      transaction.id,
      `"${transaction.customer}"`, // Wrap in quotes to handle commas in names
      `$${transaction.amount}`,
      transaction.status,
      transaction.date
    ]);

    // Combine headers and data
    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    // Create and trigger a download link
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

  // // Chart Data
  // revenueChartData = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //   datasets: [
  //     {
  //       label: 'Revenue 2024',
  //       data: [65000, 79000, 82000, 91000, 105000, 124000],
  //       borderColor: '#42A5F5',
  //       backgroundColor: 'rgba(66, 165, 245, 0.1)',
  //       fill: true
  //     }
  //   ]
  // };

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

  ngOnInit() {
    // Data loads automatically via toSignal!
  }

  
//   recentTransactions = [
//     { id: 'ORD-001', customer: 'John Smith', amount: 245, status: 'completed', date: '2024-01-15' },
//     { id: 'ORD-002', customer: 'Sarah Johnson', amount: 189, status: 'pending', date: '2024-01-15' },
//     { id: 'ORD-003', customer: 'Mike Davis', amount: 324, status: 'completed', date: '2024-01-14' },
//     { id: 'ORD-004', customer: 'Emily Wilson', amount: 156, status: 'failed', date: '2024-01-14' },
//     { id: 'ORD-005', customer: 'Chris Brown', amount: 278, status: 'completed', date: '2024-01-13' }
//   ];
// 

}