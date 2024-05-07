import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

/**
 * Middleware function to handle errors and send appropriate responses.
 * @param error The error object containing status and message properties.
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The next function in the middleware chain.
 */
export const ErrorMiddleware = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract status and message from error object, default to 500 and "Something went wrong" respectively
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong";
    // If an error occurs while handling error, pass it to the next middleware
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};
