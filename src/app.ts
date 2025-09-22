import express from "express";
import cookieParser from "cookie-parser";
import { router as apiRouter } from "./controllers/index";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api", apiRouter);
app.use(errorHandler)