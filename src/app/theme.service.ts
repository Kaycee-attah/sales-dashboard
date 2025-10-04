import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signal to track current theme
  currentTheme = signal<Theme>('light');

  constructor() {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('dashboard-theme') as Theme;
    if (savedTheme) {
      this.currentTheme.set(savedTheme);
    }

    // Watch for theme changes and apply them
    effect(() => {
      this.applyTheme(this.currentTheme());
    });
  }

  private applyTheme(theme: Theme) {
    const body = document.body;
    
    // Remove all theme classes
    body.classList.remove('light-theme', 'dark-theme');
    
    // Apply current theme
    if (theme === 'dark' || (theme === 'auto' && this.isPreferDark())) {
      body.classList.add('dark-theme');
    } else {
      body.classList.add('light-theme');
    }
    
    // Save to localStorage
    localStorage.setItem('dashboard-theme', theme);
  }

  private isPreferDark(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
  }

  toggleTheme() {
    this.currentTheme.set(this.currentTheme() === 'light' ? 'dark' : 'light');
  }
}