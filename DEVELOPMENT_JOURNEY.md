# Angular Dashboard Development Journey

## Project Overview
- **Goal**: Build a professional sales dashboard to learn Angular and impress employers
- **Timeline**: 3/10/25 - 5/10/25
- **Technologies**: Angular 17+, TypeScript, Angular Material, Chart.js, GitHub Actions

## Development Phases

### Phase 1: Project Setup
**Challenges & Solutions:**
- Angular 17+ uses standalone components by default → Learned modern Angular patterns
- Material theming selection → Chose Azure/Blue for professional look
- Configuration prompts (SSR, zoneless, AI tools) → Selected appropriate options

### Phase 2: Core Dashboard
**Features Built:**
- KPI cards with mock data
- Interactive charts with Chart.js
- Data table with Angular Material

### Phase 3: Advanced Features
**Challenges & Solutions:**
- Signals vs traditional properties → Used computed() for reactive filtering
- Search and filter functionality → Implemented with Angular Signals

### Phase 4: Deployment
**Major Challenges & Resolutions:**
1. **Node version conflict**: Angular required v20, GitHub Actions used v18 → Updated workflow
2. **Build failures**: Missing animations dependency → Installed @angular/animations
3. **404 errors**: Angular 17+ creates browser/ folder → Corrected upload path
4. **Deprecated GitHub Actions**: Updated all actions to v4/v3 versions

## Key Learnings
- Modern Angular architecture (standalone components, signals)
- CI/CD pipeline setup with GitHub Actions
- Problem-solving through error analysis
- Professional deployment practices

## Time Investment
- **Total**: 18-24 hours (over 3-4 days)
- **Breakdown**: 
  - Setup & Learning: 4-5 hours
  - Core Development: 6-8 hours  
  - Advanced Features: 4-5 hours
  - Debugging & Deployment: 4-6 hours
- **Efficiency**: Intermediate-level pace for a complex project