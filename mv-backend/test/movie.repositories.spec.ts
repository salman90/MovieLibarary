import MovieRepository from "../src/repositories/movie.repositories";
import Movie from "../src/models/movie.model";

describe("MovieRepository", () => {
  describe("save", () => {
    it("should save a new movie", async () => {
      const movieData = {
        title: "New Movie",
        description: "Description of the new movie",
        duration: 120,
        releaseYear: new Date("2022-01-01"),
        rating: 4,
        likes: 100,
        dislikes: 20,
      };
      const savedMovie = await MovieRepository.save(movieData as Movie);
      expect(savedMovie).toMatchObject(movieData);
    });

    it("should throw an error when saving a movie with invalid data", async () => {
      const invalidMovieData = {
        // Missing required fields
      };
      await expect(
        MovieRepository.save(invalidMovieData as Movie)
      ).rejects.toThrowError();
    });
  });

  // Write similar tests for other methods (retrieveAll, retrieveById, update, delete)
});
