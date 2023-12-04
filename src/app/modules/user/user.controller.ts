import { Request, Response } from "express";
import { TUser } from "./user.interface";
import { UserService } from "./user.service";
import { userValidationSchema } from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    //data validation using zod
    const userData: TUser = req.body;
    const zodParsedData = userValidationSchema.parse(userData);

    const result = await UserService.createUserIntoDB(zodParsedData);

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
    const userId = Number(req.params.userId);

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

const updateUser = async (req: Request, res: Response) => {
  try {
    //data validation using zod
    const userData: TUser = req.body;
    const userId = Number(req.params.userId);
    const zodParsedData = userValidationSchema.parse(userData);

    const result = await UserService.updateUserFromDB(userId, zodParsedData);

    //send response
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
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

const updateOrder = async (req: Request, res: Response) => {
  try {
    //data validation using zod
    const productData: TUser = req.body;
    const userId = Number(req.params.userId);
    const zodParsedData = userValidationSchema.parse(productData);

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const result = await UserService.updateOrder(userId, zodParsedData);

    //send response
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: error?.message || "Something went wrong",
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

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

const getOrdersById = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const result = await UserService.getAllOrdersByIdFromDB(userId);

    //send response
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
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

const getOrderTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const totalPrice = await UserService.getOrderTotalPrice(userId);
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        totalPrice,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error?.message || "Something went wrong!",
      error: {
        code: 404,
        description: error?.message,
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  updateOrder,
  getOrdersById,
  deleteUser,
  getOrderTotalPrice,
};
