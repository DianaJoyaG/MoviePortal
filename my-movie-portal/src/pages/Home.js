import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'; 
import '../components/Search.css';
import '../components/MovieList.css';
import '../components/GenreFilter.css';

const API_KEY = "d8f9605ca89ef4cf65d48c2dd815b4a4";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Adjust this API call to include genre filtering if selectedGenre is set
                let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
                if (selectedGenre) {
                    url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`;
                }
                const response = await axios.get(url);
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        const fetchGenres = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
                setGenres(response.data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchMovies();
        fetchGenres();
    }, [selectedGenre]); // Add selectedGenre to useEffect dependencies to refetch movies when it changes

    const handleSearchResults = (results) => {
        setSearchResults(results);
        setSelectedGenre(''); // Reset genre filter when a new search is made
    };

    const handleFilterChange = (genreId) => {
        setSelectedGenre(genreId);
        setSearchResults([]); // Clear search results to display movies based on the genre filter
    };

    // Component: Search
    const Search = ({ onSearchResults }) => {
        const [searchTerm, setSearchTerm] = useState('');

        const handleSearch = async (event) => {
            event.preventDefault();
            if (searchTerm.trim() === '') return;

            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`
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

    // Component: GenreFilter
    const GenreFilter = ({ onFilterChange }) => {
        return (
            <div>
                <select value={selectedGenre} onChange={(e) => onFilterChange(e.target.value)}>
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

    // Component: MovieList
    const MovieList = ({ movies }) => {
        if (!movies.length) return <div>No movies found.</div>;

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

    return (
        <div>
            <header className="App-header">
                <h1>--- M o V i E --- P o R t A l ---</h1>
            </header>
            <Search onSearchResults={handleSearchResults} />
            <GenreFilter onFilterChange={handleFilterChange} />
            <MovieList movies={searchResults.length > 0 ? searchResults : movies} />
        </div>
    );
};

export default Home;