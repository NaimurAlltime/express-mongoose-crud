import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

// call will controller function
router.post("/", UserControllers.createUser);
router.get("/", UserControllers.getAllUsers);
router.get("/:userId", UserControllers.getSingleUser);
router.get("/:userId/orders", UserControllers.getOrdersById);
router.put("/:userId", UserControllers.updateUser);
router.put("/:userId/orders", UserControllers.updateOrder);
router.delete("/:userId", UserControllers.deleteUser);

export const UserRoutes = router;
