import MovieRepository from "../src/repositories/movie.repositories";
import Movie from "../src/models/movie.model";
import main from "../src/app";
import { Express } from "express";

describe("MovieRepository", () => {
  let app: Express;
  let createdMovieId: number;
  let server: any; // Variable to hold the server instance

  beforeAll(async () => {
    try {
      app = await main();
      const SERVER_PORT = process.env.PORT || 4000;
      server = app.listen(SERVER_PORT, () =>
        console.log(`Server running at http://localhost:${SERVER_PORT}`)
      );
    } catch (error) {
      console.error("Error setting up test environment:", error);
      throw error;
    }
  });

  afterAll(async () => {
    await server.close(); // Close the server after all tests
  });

  describe("save", () => {
    const movieData = {
      title: "New Movie",
      description: "Description of the new movie",
      duration: 120,
      releaseYear: "2022-01-01",
      rating: 4,
      likes: 100,
      dislikes: 20,
    };

    it("should save a new movie", async () => {
      const movie = new Movie(movieData);
      const savedMovie = await MovieRepository.save(movie);
      expect(savedMovie).toMatchObject(movieData);
    });

    it("should throw an error when saving a movie with invalid data", async () => {
      const invalidMovieData = {
        // missingfields
      };
      await expect(
        MovieRepository.save(invalidMovieData as Movie)
      ).rejects.toThrowError();
    });
  });

  describe("update", () => {
    const movieData = {
      title: "New Movie",
      description: "Description of the new movie",
      duration: 120,
      releaseYear: "2022-01-01",
      rating: 4,
      likes: 100,
      dislikes: 20,
    };

    it("should save a new movie", async () => {
      const movie = new Movie(movieData);
      const savedMovie = await MovieRepository.save(movie);
      expect(savedMovie).toMatchObject(movieData);
    });

    it("should throw an error when saving a movie with invalid data", async () => {
      const invalidMovieData = {
        // missingfields
      };
      await expect(
        MovieRepository.save(invalidMovieData as Movie)
      ).rejects.toThrowError();
    });
  });
});
