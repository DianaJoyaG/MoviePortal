import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams(); // This gets the movie ID from the URL
  const navigate = useNavigate(); // This is for programmatically navigating back

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=e09a8a1a433d94e45e49b80b3af7b89d`);
        setMovie(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (error) return <div>Error fetching movie details: {error.message}</div>;
  if (!movie) return <div>Loading...</div>; 
  return (
    <div className='MovieDetails-container'>
      <div className='MovieDetails-card'>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <h2>{movie.title} ({new Date(movie.release_date).getFullYear()})</h2>
      <p><strong>Rating:</strong> {movie.vote_average}</p>
      <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
