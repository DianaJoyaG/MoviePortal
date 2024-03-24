import React from 'react';
import { useParams } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails';

const Movie = () => {
  let { id } = useParams(); // This gets the `id` param from the URL

  return (
    <div>
      {/* Pass the `id` to `MovieDetails` as a prop */}
      <MovieDetails movieId={id} />
    </div>
  );
};

export default Movie;
