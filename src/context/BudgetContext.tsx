import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Budget, Expense } from '../types';

interface BudgetContextType {
  budgets: Budget[];
  expenses: Expense[];
  addBudget: (budget: Budget) => void;
  addExpense: (expense: Expense) => void;
  deleteBudget: (budgetId: string) => void;
  deleteExpense: (expenseId: string) => void;
  getExpensesForBudget: (budgetId: string) => Expense[];
  getTotalExpensesForBudget: (budgetId: string) => number;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addBudget = useCallback((budget: Budget) => {
    setBudgets(prev => [...prev, budget]);
  }, []);

  const addExpense = useCallback((expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  }, []);

  const deleteBudget = useCallback((budgetId: string) => {
    setBudgets(prev => prev.filter(b => b.id !== budgetId));
    setExpenses(prev => prev.filter(e => e.budgetId !== budgetId));
  }, []);

  const deleteExpense = useCallback((expenseId: string) => {
    setExpenses(prev => prev.filter(e => e.id !== expenseId));
  }, []);

  const getExpensesForBudget = useCallback((budgetId: string) => {
    return expenses.filter(e => e.budgetId === budgetId);
  }, [expenses]);

  const getTotalExpensesForBudget = useCallback((budgetId: string) => {
    return getExpensesForBudget(budgetId).reduce((sum, e) => sum + e.amount, 0);
  }, [getExpensesForBudget]);

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        addBudget,
        addExpense,
        deleteBudget,
        deleteExpense,
        getExpensesForBudget,
        getTotalExpensesForBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};