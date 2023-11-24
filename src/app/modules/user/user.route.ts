import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

// call will controller function
router.post("/", UserControllers.createController);
router.get("/", UserControllers.getAllUsers);
router.get("/:userId", UserControllers.getSingleUser);
router.delete("/:userId", UserControllers.deleteUser);

export const UserRoutes = router;
