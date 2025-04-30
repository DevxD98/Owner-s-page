import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AppProvider } from './contexts/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;