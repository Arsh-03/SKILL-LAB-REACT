import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Music from './pages/Music';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/music" element={<Music />} />
      </Routes>
    </div>
  );
}

export default App;