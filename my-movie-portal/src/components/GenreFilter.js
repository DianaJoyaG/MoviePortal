import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenreFilter = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_API_KEY&language=en-US`);
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
        // Handle the error state appropriately
      }
    };

    fetchGenres();
  }, []);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    onFilterChange(event.target.value);
  };

  return (
    <div>
      <select value={selectedGenre} onChange={handleGenreChange}>
        <option value="">Select a Genre</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
