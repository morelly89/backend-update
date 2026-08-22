import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { errorMiddleware } from "./middleware/error.middleware";
import { authRateLimiter } from "./middleware/rateLimit.middleware";
import routes from "./routes";

dotenv.config();


const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nugget-app-preview.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use(authRateLimiter);
app.use("/api", routes);
app.use(errorMiddleware);

export default app;

