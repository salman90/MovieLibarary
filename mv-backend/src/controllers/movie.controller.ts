import { Request, Response, NextFunction } from "express";
import Movie from "../models/movie.model";
import MovieRepository from "../repositories/movie.repositories";

export default class MovieController {
  /**
   * Create a new movie.
   * @param req Request object containing movie data in the body
   * @param res Response object
   * @param next NextFunction to handle errors
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const movie = new Movie(req.body);
      const savedMovie = await MovieRepository.save(movie);
      res.status(200).json(savedMovie);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Find movies by title.
   * @param req Request object containing query parameters
   * @param res Response object
   * @param next NextFunction to handle errors
   */
  async findByTitle(req: Request, res: Response, next: NextFunction) {
    try {
      const title = req.query.title as string;
      const movies = await MovieRepository.retrieveAll({ title });
      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Find a movie by ID.
   * @param movieId ID of the movie to retrieve
   * @returns Promise<Movie | null> A promise that resolves to the retrieved movie or null if not found
   */
  async findbyId(movieId: number): Promise<Movie | null> {
    try {
      const movie = await MovieRepository.retrieveById(movieId);
      return movie;
    } catch (error) {
      throw new Error("Error retrieving movie");
    }
  }

  /**
   * Update an existing movie.
   * @param req Request object containing movie ID in parameters and updated movie data in body
   * @param res Response object
   * @param next NextFunction to handle errors
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const movieData: Movie = req.body;
      const affectedRows = await MovieRepository.update(id, movieData);
      if (affectedRows <= 0) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.status(200).json({ affectedRows });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete an existing movie.
   * @param req Request object containing movie ID in parameters
   * @param res Response object
   * @param next NextFunction to handle errors
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const movieId = parseInt(id);
      const affectedRows = await MovieRepository.delete(movieId);
      if (affectedRows <= 0) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.status(200).json({ affectedRows });
    } catch (error) {
      next(error);
    }
  }
}
