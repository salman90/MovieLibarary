import React, { useState, useCallback } from "react";
import "./App.css";

// Importing Material-UI components
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

import Movie from "./components/movie/Movie";
import { IMovie } from "./components/movie/types";
import { deleteMovie, updateMovie } from "./utils/movieUtils";
import { useMovieSearch } from "./hooks/useMovieSearch";

function App() {
  // State for the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Custom hook to search movies based on the search term
  const { movies, loading, error, setMovies, setError } =
    useMovieSearch(searchTerm);

  // Handler for search input change
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setSearchTerm(e.target.value);
  };

  // Handler for deleting a movie
  const handleDelete = useCallback(
    async (movieId: number) => {
      try {
        setError("");
        if (movieId) {
          const success = await deleteMovie(Number(movieId)); // Convert to number
          if (success) {
            setMovies(
              (prevMovies) =>
                prevMovies.filter((movie) => movie.id !== Number(movieId)) // Convert to number
            );
          } else {
            setError("Failed to delete movie");
          }
        }
      } catch (error) {
        setError("Failed to delete movie");
      }
    },
    [movies]
  );

  // Handler for updating a movie
  const handleUpdate = useCallback(
    async (updatedMovie: IMovie) => {
      try {
        setError("");
        const success = await updateMovie(updatedMovie);
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === updatedMovie.id ? updatedMovie : movie
          )
        );
        if (success) {
        } else {
          setError("Failed to update movie");
        }
      } catch (error) {
        setError("Failed to update movie");
      }
    },
    [movies]
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Library</h1>
      </header>
      <main>
        <section className="searchBar_container">
          <TextField
            id="search-bar"
            label="Search by Title"
            sx={{ width: "30%" }}
            size="small"
            onChange={handleSearch}
            value={searchTerm}
          />
        </section>

        <section className="main_container">
          {loading && (
            <div className="loading_container">
              <CircularProgress className="loading-indicator" />
            </div>
          )}
          <div className="error">
            {!loading && error && <p> Error: {error}</p>}
          </div>
          {!loading && !error && (
            <ul className="movies_container">
              {movies.map((movie) => (
                <Movie
                  key={movie.id}
                  movie={movie}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
