import { Request, Response } from "express";
import { UserService } from "./user.service";

const createController = async (req: Request, res: Response) => {
  try {
    //data validation using zod

    const { users: userData } = req.body;

    //   will call service function get data
    const result = await UserService.createUserIntuDB(userData);

    //send response
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUserFromDB();

    //send response
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserService.getSingleUserFromDB(userId);

    //send response
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: error?.message || "Something went wrong",
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserService.deleteUserFromDB(userId);

    //send response
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: error?.message || "Something went wrong",
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

export const UserControllers = {
  createController,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
