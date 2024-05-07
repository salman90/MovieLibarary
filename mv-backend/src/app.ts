import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
import Database from "./database/index";

import moviesRouter from "./routes/movies";

import { Express } from "express";
import { ErrorMiddleware } from "./middlewares/error.middleware";

dotenv.config();

async function main() {
  const app: Express = express();
  const db = new Database();
  await db.connectAndPopulateDatabase();

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors());

  app.use("/movies", moviesRouter);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  app.use(ErrorMiddleware);

  return app;
}

export default main;
