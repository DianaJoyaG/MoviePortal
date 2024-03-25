import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';
import Search from '../components/Search';
import GenreFilter from '../components/GenreFilter';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch all movies initially or when genre changes without a specific search
    const fetchMovies = async () => {
      try {
        let url = 'https://api.themoviedb.org/3/discover/movie?api_key=d8f9605ca89ef4cf65d48c2dd815b4a4';
        if (selectedGenre) {
          url += `&with_genres=${selectedGenre}`;
        }
        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    if (!searchResults.length || selectedGenre) {
      fetchMovies();
    }
  }, [selectedGenre]); // Dependency array ensures this effect runs when selectedGenre changes

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setSelectedGenre(''); // Reset genre filter when new search is made, so it doesn't immediately filter out new search results
  };

  const handleFilterChange = (genreId) => {
    setSelectedGenre(genreId);
    if (!searchResults.length) {
      // No recent search, so we fetch or filter all movies by genre
    } else {
      // Optional: Could filter searchResults here if needed
    }
  };

  // Determine which movies to display based on search results or genre filtering
  const displayedMovies = searchResults.length > 0 ? searchResults : movies;

  return (
    <div>
      <header className="App-header">
        <h1>--- M o V i E ---  P o R t A l ---</h1>
      </header>
      <Search onSearchResults={handleSearchResults} />
      <GenreFilter onFilterChange={handleFilterChange} />
      <MovieList movies={displayedMovies} />
    </div>
  );
};

export default Home;



  