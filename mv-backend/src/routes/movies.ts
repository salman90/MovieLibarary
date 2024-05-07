import { Router } from "express";
import MovieController from "../controllers/movie.controller";

const router = Router();
const movieController = new MovieController();

// Define routes for handling movie operations
router.get("/", movieController.findByTitle); // Route for retrieving movies by title
router.post("/", movieController.create); // Route for creating a new movie
router.put("/:id", movieController.update); // Route for updating an existing movie by ID
router.delete("/:id", movieController.delete); // Route for deleting an existing movie by ID

export default router;
