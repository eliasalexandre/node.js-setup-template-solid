import "reflect-metadata";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import express, { NextFunction, Response, Request } from "express";

import "@shared/container";

dotenv.config();

import { routes } from "./routes";

import "@shared/container";
import { AppError } from "../../errors/AppError";
import "@shared/infra/typeorm"; // database_

// MIDDLEWARES
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${error.message}`,
    });
  }
);

export { app };
