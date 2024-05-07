import { IMovie } from "../components/movie/types";
import { deleteRequest, updateRequest } from "./apiService";

// Interface representing the response structure for deleting a movie
interface IDeleteResponse {
  affectedRows: number;
}

// Interface representing the response structure for updating a movie
interface IUpdateResponse {
  affectedRows: number;
}

// Async function to delete a movie by its ID
export const deleteMovie = async (movieId: number) => {
  try {
    const response: IDeleteResponse = await deleteRequest(`movies/${movieId}`);
    if (response.affectedRows === 0) {
      throw new Error("Movie not found");
    }
    return true; // Indicate success
  } catch (error) {
    console.error(error);
    return false; // Indicate failure
  }
};

// Async function to update a movie with new data
export const updateMovie = async (movie: IMovie) => {
  try {
    const response: IUpdateResponse = await updateRequest(
      `movies/${movie.id}`,
      movie
    );
    if (response.affectedRows === 0) {
      throw new Error("Movie not found");
    }
    return true; // Indicate success
  } catch (error) {
    console.error(error);
    return false; // Indicate failure
  }
};
