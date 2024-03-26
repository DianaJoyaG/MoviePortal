import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

const Search = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchTerm.trim() === '') return;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${encodeURIComponent(searchTerm)}`
      );
      onSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching for movies:', error);
      
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a movie..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;


