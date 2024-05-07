import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { getRequest } from "../utils/apiService"; // Importing the get function for making API requests
import { IMovie, UseMovieSearchResult } from "../components/movie/types"; // Importing the IMovie type for movies

/**
 * Define the custom hook function with the specified return type
 * @param searchTerm
 * @returns  movies, loading, error, setMovies, setError, setLoading
 */
export const useMovieSearch = (searchTerm: string): UseMovieSearchResult => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect hook to fetch movies when the searchTerm changes
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        // Make an API request to fetch movies based on the searchTerm
        const response = await getRequest<IMovie[]>(`movies`, {
          params: {
            title: searchTerm,
          },
        });
        setMovies(response);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          setError(`Response status: ${axiosError.response.status}`);
        } else if (axiosError.request) {
          setError("Request failed");
        } else {
          setError("Error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    // Check if the searchTerm is not empty before fetching movies
    if (searchTerm.trim() !== "") {
      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [searchTerm]);

  return { movies, loading, error, setMovies, setError, setLoading };
};
