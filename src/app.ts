import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorMiddleware } from "./middleware/error.middleware";
import dotenv from "dotenv";
import { authRateLimiter } from "./middleware/rateLimit.middleware";

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

app.use(authRateLimiter);
app.use("/api", routes);
app.use(errorMiddleware);

export default app;

