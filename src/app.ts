import express from "express";
import logger from "morgan";
import * as path from "path";
import cors from "cors";
import helmet from "helmet";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import { index } from "./routes/index";
import { search } from "./routes/search";

// Create Express server
export const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(cors());
app.use(helmet()),
app.use(express.json()),

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", index);
app.use("/search", search);

app.use(errorNotFoundHandler);
app.use(errorHandler);
