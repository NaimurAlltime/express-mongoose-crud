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
  } catch (error: any) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

export const UserControllers = {
  createController,
};
