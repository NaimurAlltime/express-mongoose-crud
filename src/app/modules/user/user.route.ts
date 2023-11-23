import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

// call will controller function
router.post("/", UserControllers.createController);

export const UserRoutes = router;
