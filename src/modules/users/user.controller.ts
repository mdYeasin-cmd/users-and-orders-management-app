import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    console.log(userData);

    const result = await UserServices.createUserIntoDB(userData);

    console.log(result, "controller");

    const { password, orders, ...resultWithoutPassword } = result.toObject();

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: resultWithoutPassword,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User creation process failed!",
      error: {
        code: 500,
        description: error.message || "User creation process failed!",
      },
    });
  }
};

export const UserControllers = {
  createUser,
};
