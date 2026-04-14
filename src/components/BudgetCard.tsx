import React from 'react';
import type { Budget } from '../types';
import { useBudget } from '../context/BudgetContext';
import styles from './BudgetCard.module.css';

interface BudgetCardProps {
  budget: Budget;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ budget }) => {
  const { getExpensesForBudget, getTotalExpensesForBudget, deleteExpense, deleteBudget } = useBudget();
  const expenses = getExpensesForBudget(budget.id);
  const totalExpenses = getTotalExpensesForBudget(budget.id);
  const remaining = budget.limit - totalExpenses;
  const percentage = (totalExpenses / budget.limit) * 100;
  const isOver = remaining < 0;

  const handleDeleteBudget = () => {
    if (window.confirm(`Delete budget "${budget.name}"? This will also delete all its expenses.`)) {
      deleteBudget(budget.id);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.budgetName}>{budget.name}</h2>
        <button className={styles.deleteBtn} onClick={handleDeleteBudget} title="Delete budget">
          ×
        </button>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.label}>Limit</span>
          <span className={styles.value}>${budget.limit.toFixed(2)}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.label}>Spent</span>
          <span className={styles.value}>${totalExpenses.toFixed(2)}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.label}>Remaining</span>
          <span className={`${styles.value} ${isOver ? styles.over : styles.positive}`}>
            ${remaining.toFixed(2)}
          </span>
        </div>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressBar}>
          <div
            className={`${styles.progress} ${isOver ? styles.overProgress : ''}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <p className={styles.progressText}>
          {Math.round(percentage)}% of budget spent
        </p>
      </div>

      {expenses.length > 0 ? (
        <div className={styles.expensesList}>
          <h3 className={styles.expensesTitle}>Expenses ({expenses.length})</h3>
          <ul className={styles.expenses}>
            {expenses.map(expense => (
              <li key={expense.id} className={styles.expenseItem}>
                <div className={styles.expenseDetails}>
                  <span className={styles.expenseName}>{expense.name}</span>
                  <span className={styles.expenseCategory}>{expense.category}</span>
                </div>
                <div className={styles.expenseRight}>
                  <span className={styles.expenseAmount}>${expense.amount.toFixed(2)}</span>
                  <button
                    className={styles.deleteExpenseBtn}
                    onClick={() => deleteExpense(expense.id)}
                    title="Delete expense"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={styles.noExpenses}>No expenses yet</p>
      )}
    </div>
  );
};