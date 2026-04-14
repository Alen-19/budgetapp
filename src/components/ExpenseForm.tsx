import React, { useState } from 'react';
import type { Expense } from '../types';
import { useBudget } from '../context/BudgetContext';
import styles from './ExpenseForm.module.css';

interface ExpenseFormProps {
  budgetId: string;
}

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Other'];

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ budgetId }) => {
  const { addExpense } = useBudget();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Expense description is required');
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    const expense: Expense = {
      id: `expense-${Date.now()}`,
      budgetId,
      name: name.trim(),
      amount: Number(amount),
      category,
      date: new Date(),
    };

    addExpense(expense);
    setName('');
    setAmount('');
    setCategory(CATEGORIES[0]);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Add Expense</h3>

      <div className={styles.formGroup}>
        <label htmlFor={`expense-name-${budgetId}`}>Description</label>
        <input
          id={`expense-name-${budgetId}`}
          type="text"
          placeholder="e.g., Coffee, Gas, Movie ticket"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor={`expense-category-${budgetId}`}>Category</label>
          <select
            id={`expense-category-${budgetId}`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.input}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor={`expense-amount-${budgetId}`}>Amount ($)</label>
          <input
            id={`expense-amount-${budgetId}`}
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.input}
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.button}>
        Add Expense
      </button>
    </form>
  );
};