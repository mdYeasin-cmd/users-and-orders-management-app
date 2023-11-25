import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./modules/users/user.route";

const app: Application = express();

// middlewares
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/users", UserRoutes);

// test route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Users and orders management app running...",
  });
});

// 404 route
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route is not found",
    error: {
      code: 404,
      description: "Route is not found",
    },
  });
});

// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err) {
    res.status(500).json({
      success: false,
      message: "Failed to send data (global error handler)",
      error: {
        code: 500,
        description: "Failed to send data (global error handler)",
      },
    });
  }
});

export default app;
