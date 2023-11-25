import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Users and orders management app running...",
  });
});

export default app;
