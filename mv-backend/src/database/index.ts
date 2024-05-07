import { Sequelize } from "sequelize-typescript";
import { config, dialect } from "../database/db.config";

import Movie from "../models/movie.model";
import { movies } from "./constants";

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.sequelize = this.createConnection();
  }

  // Create a new Sequelize connection
  private createConnection(): Sequelize | undefined {
    try {
      const sequelize = new Sequelize({
        database: config.DB,
        dialect: dialect as any,
        username: config.USER,
        password: config.PASSWORD,
        host: config.HOST,
        models: [Movie],
        pool: {
          max: config.pool.max,
          min: config.pool.min,
          acquire: config.pool.acquire,
          idle: config.pool.idle,
        },
      });

      return sequelize;
    } catch (error) {
      console.error("Unable to connect to the Database:", error);
    }
  }

  // Connect to the database and populate it with initial data
  async connectAndPopulateDatabase() {
    if (!this.sequelize) {
      console.error("Database connection is not established.");
      return;
    }

    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync(); // Call sequelize.sync() to sync models with the database
      await this.populateDatabase();
      console.log("Database connected and populated successfully.");
    } catch (error) {
      console.error("Error connecting and populating database:", error);
    }
  }

  // Populate the database with initial movie data
  private async populateDatabase() {
    try {
      const movieCount = await Movie.count();
      if (movieCount === 0) {
        await Movie.bulkCreate(movies);
      }
    } catch (error) {
      console.error("Error populating database:", error);
    }
  }
}

export default Database;
