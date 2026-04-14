export interface Budget {
  id: string;
  name: string;
  limit: number;
  createdAt: Date;
}

export interface Expense {
  id: string;
  budgetId: string;
  name: string;
  amount: number;
  category: string;
  date: Date;
}

export interface BudgetWithExpenses extends Budget {
  expenses: Expense[];
}