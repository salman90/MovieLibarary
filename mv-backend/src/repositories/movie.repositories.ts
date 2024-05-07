import Movie from "../models/movie.model";
import { Op } from "sequelize";
import { ValidationError } from "sequelize";

// Define the interface for the MovieRepository
interface IMovieRepository {
  save(movie: Movie): Promise<Movie>;
  retrieveAll(searchParams: { title: string }): Promise<Movie[]>;
  retrieveById(movieId: number): Promise<Movie | null>;
  delete(movieId: number): Promise<number>;
  update(movieId: number, movie: Movie): Promise<number>;
}

class MovieRepository implements IMovieRepository {
  async save(movie: Movie): Promise<Movie> {
    try {
      // Create a new movie record in the database
      return await Movie.create({
        title: movie.title,
        description: movie.description,
        duration: movie.duration,
        releaseYear: movie.releaseYear,
        rating: movie.rating,
        likes: movie.likes,
        dislikes: movie.dislikes,
      });
    } catch (error: any) {
      // Handle validation errors
      if (error instanceof ValidationError) {
        throw new Error(error.message);
      }
      // Throw a generic error if saving fails
      throw new Error(error.message ?? "Error saving movie");
    }
  }

  async retrieveAll(searchParams: { title: string }): Promise<Movie[]> {
    try {
      let condition: any = {};
      // Check if title search parameter is provided
      if (searchParams?.title && searchParams.title !== "") {
        // Build the search condition to find movies by title using Sequelize's Op.like operator
        condition.title = { [Op.like]: `%${searchParams.title}%` };
        // Retrieve movies that match the search condition
        return await Movie.findAll({ where: condition });
      } else {
        throw new Error("Title is required");
      }
    } catch (error: any) {
      throw new Error(error.message ?? "Error retrieving movies");
    }
  }

  async retrieveById(movieId: number): Promise<Movie | null> {
    try {
      // Retrieve a movie by its ID
      return await Movie.findByPk(movieId);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new Error(error.message);
      }
      throw new Error("Error retrieving movie");
    }
  }

  async update(movieId: number, movie: Movie): Promise<number> {
    const {
      title,
      description,
      likes,
      dislikes,
      duration,
      releaseYear,
      rating,
    } = movie;

    try {
      // Update the movie record in the database
      const affectedRows = await Movie.update(
        { title, description, likes, dislikes, duration, releaseYear, rating },
        { where: { id: movieId } }
      );
      return affectedRows[0]; // Return the number of affected rows
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new Error(error.message);
      }
      throw new Error("Failed to update Movie!");
    }
  }

  async delete(movieId: number): Promise<number> {
    try {
      // Delete the movie record from the database
      const affectedRows = await Movie.destroy({ where: { id: movieId } });
      return affectedRows;
    } catch (error: any) {
      if (error instanceof ValidationError) {
        throw new Error(error.message);
      }

      throw new Error("Error deleting movie");
    }
  }
}

export default new MovieRepository(); // Export an instance of MovieRepository
