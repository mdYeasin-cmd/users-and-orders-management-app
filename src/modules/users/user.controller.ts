import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const result = await UserServices.createUserIntoDB(userData);

    const { password, orders, ...resultWithoutPassword } = result.toObject();

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: resultWithoutPassword,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User creation process failed!",
      error: {
        code: 500,
        description: error.message || "User creation process failed!",
      },
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();

    res.status(200).json({
      success: true,
      message: "All user retrieved successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Users fetching process is failed!",
      error: {
        code: 500,
        description: error.message || "Users fetching process is failed!",
      },
    });
  }
};

const getAUserByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getAUserByUserIdFromDB(Number(userId));

    res.status(201).json({
      success: true,
      message: "User is retrieved successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User fetching process is failed!",
      error: {
        code: 500,
        description: error.message || "User fetching process is failed!",
      },
    });
  }
};

const updateAUserByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user: userData } = req.body;

    const result = await UserServices.updateAUserByUserIdFromDB(
      Number(userId),
      userData
    );

    res.status(201).json({
      success: true,
      message: "User is updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User updating process is failed!",
      error: {
        code: 500,
        description: error.message || "User updating process is failed!",
      },
    });
  }
};

const deleteAUserByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await UserServices.deleteAUserByUserIdFromDB(Number(userId));

    res.status(201).json({
      success: true,
      message: "User is deleted successfully!",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User deleting process is failed!",
      error: {
        code: 500,
        description: error.message || "User deleting process is failed!",
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getAUserByUserId,
  updateAUserByUserId,
  deleteAUserByUserId,
};
