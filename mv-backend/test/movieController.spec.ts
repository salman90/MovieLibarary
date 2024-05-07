import request from "supertest";
import main from "../src/app";
import { Express } from "express";

const startTestServer = async () => {};

export default startTestServer;

describe("MovieController", () => {
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

  it("should create a new movie", async () => {
    const newMovieData = {
      title: "New Movie",
      description: "Description of the new movie",
      duration: 120,
      //releaseYear: "2022-01-01", // Assuming releaseYear is a string in the format 'YYYY-MM-DD'
      rating: 4,
      likes: 100,
      dislikes: 20,
    };

    const response = await request(app)
      .post("/movies")
      .send(newMovieData)
      .expect(200);

    expect(response.body).toHaveProperty("id");
    createdMovieId = response.body.id;
  });

  it("should retrieve movies by title", async () => {
    const response = await request(app)
      .get("/movies")
      .query({ title: "New Movie" }) // Assuming 'New Movie' is the title of the newly created movie
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    // Test failure case - Non-existent title
    const nonExistentTitle = "Non Existent Movie";
    const nonExistentResponse = await request(app)
      .get("/movies")
      .query({ title: nonExistentTitle })
      .expect(200);

    expect(Array.isArray(nonExistentResponse.body)).toBe(true);
    expect(nonExistentResponse.body.length).toBe(0);
  });

  it("should update an existing movie", async () => {
    const updatedMovieData = {
      title: "Updated Movie Title",
    };

    await request(app)
      .put(`/movies/${createdMovieId}`)
      .send(updatedMovieData)
      .expect(200);
  });

  it("should delete an existing movie", async () => {
    await request(app).delete(`/movies/${createdMovieId}`).expect(200);
    await request(app).delete(`/movies/invalid_id`).expect(500);
  });

  it("should return 404 error when retrieving non-existent movie by ID", async () => {
    const nonExistentMovieId = 9999;
    await request(app).get(`/movies/${nonExistentMovieId}`).expect(404);
  });
});
