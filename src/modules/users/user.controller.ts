/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;

        const result = await UserServices.createUserIntoDB(userData);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, password, orders, ...resultWithoutPassword } =
            result.toObject();

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

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserServices.getAllUsersFromDB();

        let message;

        if (result.length > 0) {
            message = "Users fetched successfully!";
        } else {
            message = "Couldn't find any user in database!";
        }

        res.status(200).json({
            success: true,
            message: message,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Users fetching process is failed!",
            error: {
                code: 500,
                description:
                    error.message || "Users fetching process is failed!",
            },
        });
    }
};

const getAUserByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const result = await UserServices.getAUserByUserIdFromDB(
            Number(userId),
        );

        res.status(201).json({
            success: true,
            message: "User fetched successfully!",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "User fetching process is failed!",
            error: {
                code: 500,
                description:
                    error.message || "User fetching process is failed!",
            },
        });
    }
};

const updateAUserByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const userData = req.body;

        const result = await UserServices.updateAUserByUserIdIntoDB(
            Number(userId),
            userData,
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
                description:
                    error.message || "User updating process is failed!",
            },
        });
    }
};

const deleteAUserByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        await UserServices.deleteAUserByUserIdFromDB(Number(userId));

        res.status(200).json({
            success: true,
            message: "User is deleted successfully!",
            data: null,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "User deleting process is failed!",
            error: {
                code: 500,
                description:
                    error.message || "User deleting process is failed!",
            },
        });
    }
};

export const UserControllers = {
    createUser,
    getAllUsers,
    getAUserByUserId,
    updateAUserByUserId,
    deleteAUserByUserId,
};
