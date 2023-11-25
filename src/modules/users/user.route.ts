import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/", UserControllers.createUser);
router.get("/", UserControllers.getAllUser);
router.get("/:userId", UserControllers.getAUserByUserId);
router.put("/:userId", UserControllers.updateAUserByUserId);

export const UserRoutes = router;
