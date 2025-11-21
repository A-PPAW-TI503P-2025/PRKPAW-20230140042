import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import komponen dari folder components
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route untuk Login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Route untuk Register */}
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Route untuk Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Redirect root (/) ke halaman login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;