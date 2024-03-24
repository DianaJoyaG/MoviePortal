import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import './App.css'; // Your main stylesheet (if you have one)

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/movie/:id" element={<Movie/>} />  
      </Routes>
    </Router>
  );
};

export default App;
