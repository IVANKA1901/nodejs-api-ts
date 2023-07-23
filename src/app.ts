import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

const contactsRouter = require("./routes/api/contacts-routes");
const authRouter = require("./routes/api/auth-routes");

const app = express();
dotenv.config();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req: Request, res: Response): void => {
  res.status(404).json({ message: "Not found" });
});

interface RequestError extends Error {
  status?: number;
}

app.use(
  (
    err: RequestError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const { status = 500, message = "Server Error" } = err;
    res.status(status).json({ message });
  }
);

export default app;
