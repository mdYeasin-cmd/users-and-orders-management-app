import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/", UserControllers.createUser);
router.get("/", UserControllers.getAllUsers);
router.get("/:userId", UserControllers.getAUserByUserId);
router.put("/:userId", UserControllers.updateAUserByUserId);
router.delete("/:userId", UserControllers.deleteAUserByUserId);

export const UserRoutes = router;
