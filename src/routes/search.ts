import { Router } from "express";
import * as controller from "../controllers/search";

export const search = Router();

search.get("/", controller.search);
