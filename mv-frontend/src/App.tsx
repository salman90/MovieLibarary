import React, { useState } from "react";
import "./App.css";

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
  const { movies, loading, error, setMovies, setError, setLoading } =
    useMovieSearch(searchTerm);

  // Handler for search input change
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setSearchTerm(e.target.value);
  };

  // Handler for deleting a movie
  const handleDelete = async (movieId: number) => {
    try {
      setLoading(true);
      setError("");
      const success = await deleteMovie(movieId);
      if (success) {
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.id !== movieId)
        );
      } else {
        setError("Failed to delete movie");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handler for updating a movie
  const handleUpdate = async (updatedMovie: IMovie) => {
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
    } finally {
      setLoading(false);
    }
  };

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
                  onDelete={() => handleDelete(movie.id)}
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
