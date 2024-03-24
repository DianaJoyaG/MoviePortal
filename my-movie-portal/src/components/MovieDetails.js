import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams(); // This gets the movie ID from the URL
  const navigate = useNavigate(); // This is for programmatically navigating back

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`);
        setMovie(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (error) return <div>Error fetching movie details: {error.message}</div>;
  if (!movie) return <div>Loading...</div>; // You might want to handle loading state differently

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <h2>{movie.title} ({new Date(movie.release_date).getFullYear()})</h2>
      <p><strong>Rating:</strong> {movie.vote_average}</p>
      <p>{movie.overview}</p>
      <div>
        <h3>Cast</h3>
        {/* Implement cast list here. You might need to make another API call to get this data. */}
      </div>
      {/* You can add more movie details here */}
    </div>
  );
};

export default MovieDetails;
