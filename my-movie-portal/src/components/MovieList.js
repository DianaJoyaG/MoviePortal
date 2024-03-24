import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=YOUR_API_KEY`);
        setMovies(response.data.results);
      } catch (error) {
        setError(error);
      }
    };

    fetchMovies();
  }, []);

  if (error) return <div>Error fetching movies: {error.message}</div>;

  return (
    <div>
      <h2>Top Rated Movies</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              {movie.title} ({movie.release_date.split('-')[0]}) - Rating: {movie.vote_average}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
