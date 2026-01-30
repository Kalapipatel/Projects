import React from 'react';
import AppRouter from './router/AppRouter';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/layout/ErrorBoundary';

const App = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;