<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a responsive React budget management application built with Vite and TypeScript. The app helps users track financial expenditures with forms, budget creation, and expense tracking capabilities.

## Technology Stack
- React 18+ with TypeScript
- Vite for build tooling and dev server at http://localhost:5173/
- CSS Modules for component-scoped styling (not SCSS)
- React Context API + Hooks for state management
- Responsive design with breakpoints at 768px and 1024px

## Key Features
- ✅ Create and manage multiple budgets
- ✅ Add and track expenses with categories
- ✅ Visual progress indicators for budget status
- ✅ Responsive design for all devices (mobile, tablet, desktop)
- ✅ Form validation for user inputs
- ✅ Real-time budget calculations

## Project Structure
```
src/
├── components/
│   ├── BudgetCard.tsx          # Display individual budgets
│   ├── BudgetCard.module.css   # Component styles
│   ├── BudgetForm.tsx          # Create new budgets
│   ├── BudgetForm.module.css
│   ├── BudgetList.tsx          # Container for all budgets
│   ├── BudgetList.module.css
│   ├── ExpenseForm.tsx         # Add expenses to budgets
│   └── ExpenseForm.module.css
├── context/
│   └── BudgetContext.tsx       # Global state management
├── types/
│   └── index.ts                # TypeScript interfaces
├── App.tsx
├── App.css
├── main.tsx
└── index.css
```

## Development Commands
- `npm run dev` - Start development server at http://localhost:5173/
- `npm run build` - Create production build in /dist
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint checks

## Development Guidelines
- Use functional components with React Hooks
- Use type-only imports for interfaces: `import type { Budget } from '../types'`
- Keep components focused and reusable
- Use CSS Modules (not SCSS) - all styles must be valid flat CSS
- Implement mobile-first responsive design
- Add form validation with clear error messages
- Manage all state through BudgetContext

## Component Responsibilities
- **BudgetForm**: Creates new budgets with validation
- **BudgetList**: Container managing all budgets layout
- **BudgetCard**: Displays budget status, expenses, and delete buttons
- **ExpenseForm**: Inline form to add expenses to a specific budget

## State Management (BudgetContext)
- `budgets[]` - List of all budgets
- `expenses[]` - List of all expenses (linked to budgets by ID)
- `addBudget()` - Create new budget
- `addExpense()` - Add expense to budget
- `deleteBudget()` - Delete budget and its expenses
- `deleteExpense()` - Delete individual expense
- `getTotalExpensesForBudget()` - Calculate budget spending

## Styling Notes
- ✅ Use flat CSS (no nesting with &)
- ✅ Use @media queries at top level (not nested inside selectors)
- ✅ Use CSS Module classes for component styles
- ✅ Responsive breakpoints: 768px (mobile) and 1024px (tablet)
- ❌ Do NOT use SCSS syntax or nested rules
- ❌ Do NOT nest @media inside selectors

## Color Palette
- Primary: #667eea → #764ba2 (Purple-blue gradient)
- Success: #4CAF50 (Green)
- Danger: #d32f2f (Red)
- Info: #2196F3 (Blue)
- Backgrounds: #fafafa, #f9f9f9, #ffffff
- Borders: #e0e0e0, #ddd
