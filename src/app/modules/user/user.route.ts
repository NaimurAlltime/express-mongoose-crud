import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

// call will controller function
router.post("/", UserControllers.createController);
router.get("/", UserControllers.getAllUsers);

export const UserRoutes = router;
