import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import InterfaceGenerator from './components/InterfaceGenerator';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<InterfaceGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;