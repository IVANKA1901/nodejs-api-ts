import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const formatsLogger: string =
  app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
