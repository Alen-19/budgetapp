import React from 'react';
import { useBudget } from '../context/BudgetContext';
import { BudgetForm } from './BudgetForm';
import { ExpenseForm } from './ExpenseForm';
import { BudgetCard } from './BudgetCard';
import styles from './BudgetList.module.css';

export const BudgetList: React.FC = () => {
  const { budgets } = useBudget();

  return (
    <div className={styles.container}>
      <BudgetForm />

      {budgets.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No budgets yet. Create one to get started!</p>
        </div>
      ) : (
        <div className={styles.budgetsGrid}>
          {budgets.map(budget => (
            <div key={budget.id} className={styles.budgetSection}>
              <BudgetCard budget={budget} />
              <ExpenseForm budgetId={budget.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};