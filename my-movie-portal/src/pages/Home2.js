import React, { useState } from 'react';
import MovieList from '../components/MovieList';
import Search from '../components/Search';
import GenreFilter from '../components/GenreFilter';
import './Home.css';

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
    
  };

  return (
    <div>
      <header className="App-header">
        <h1>--- M o V i E ---  P o R t A l ---</h1>
      </header>

      <Search onSearchResults={handleSearchResults} />
      <GenreFilter onFilterChange={handleFilterChange} />
      <MovieList movies={searchResults.length > 0 ? searchResults : movies} />
    </div>
  );
};

export default Home;
