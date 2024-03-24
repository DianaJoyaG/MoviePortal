import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import './App.css'; // Your main stylesheet (if you have one)

const App = () => {
  return (
    <Router>
      <div>
        {/* Global application components like a header or navigation can go here */}
        
        {/* Define your application's routes */}
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/movie/:id" element={<Movie />} />
          {/* You can add more routes here as your application grows */}
        </Routes>

        {/* Global application components like a footer can go here */}
      </div>
    </Router>
  );
};

export default App;
