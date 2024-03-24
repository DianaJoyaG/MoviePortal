import React, { useState } from 'react';
import MovieList from '../components/MovieList';
import MovieDetails from '../components/MovieDetails';
import Search from '../components/Search';
import GenreFilter from '../components/GenreFilter';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setSelectedGenre(''); // Reset genre filter when new search is made
  };

  const handleFilterChange = (genreId) => {
    setSelectedGenre(genreId);
    // Implement functionality to fetch and set movies based on selected genre
  };

  return (
    <Router>
      <div>
        <Search onSearchResults={handleSearchResults} />
        <GenreFilter onFilterChange={handleFilterChange} />

        <Routes>
          <Route path="/" element={<MovieList movies={searchResults.length > 0 ? searchResults : movies} />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;
