import { BudgetProvider } from './context/BudgetContext';
import { BudgetList } from './components/BudgetList';
import './App.css';

function App() {
  return (
    <BudgetProvider>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1>💰 Budget Tracker</h1>
            <p>Manage your finances and track your expenses</p>
          </div>
        </header>
        <main className="app-main">
          <BudgetList />
        </main>
        <footer className="app-footer">
          <p>© 2026 Budget Tracker. Stay in control of your money.</p>
        </footer>
      </div>
    </BudgetProvider>
  );
}

export default App;
