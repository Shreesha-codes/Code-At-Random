import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CareerInput from './pages/CareerInput';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CareerInput />} />
        <Route path="/dashboard" element={<div>Dashboard Page (Coming Soon)</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
