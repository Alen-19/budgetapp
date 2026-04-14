import React, { useState } from 'react';
import type { Budget } from '../types';
import { useBudget } from '../context/BudgetContext';
import styles from './BudgetForm.module.css';

export const BudgetForm: React.FC = () => {
  const { addBudget } = useBudget();
  const [name, setName] = useState('');
  const [limit, setLimit] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Budget name is required');
      return;
    }

    if (!limit || isNaN(Number(limit)) || Number(limit) <= 0) {
      setError('Please enter a valid budget limit');
      return;
    }

    const budget: Budget = {
      id: `budget-${Date.now()}`,
      name: name.trim(),
      limit: Number(limit),
      createdAt: new Date(),
    };

    addBudget(budget);
    setName('');
    setLimit('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Create New Budget</h2>
      
      <div className={styles.formGroup}>
        <label htmlFor="budget-name">Budget Name</label>
        <input
          id="budget-name"
          type="text"
          placeholder="e.g., Groceries, Rent, Entertainment"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="budget-limit">Budget Limit ($)</label>
        <input
          id="budget-limit"
          type="number"
          placeholder="Enter amount"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className={styles.input}
          min="0"
          step="0.01"
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.button}>
        Create Budget
      </button>
    </form>
  );
};