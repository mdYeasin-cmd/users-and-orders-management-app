import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/", UserControllers.createUser);
router.get("/", UserControllers.getAllUsers);
router.get("/:userId", UserControllers.getAUserByUserId);
router.put("/:userId", UserControllers.updateAUserByUserId);
router.delete("/:userId", UserControllers.deleteAUserByUserId);
router.put("/:userId/orders", UserControllers.addAOrderByUserId);
router.get("/:userId/orders", UserControllers.getAllOrdersByUserId);

export const UserRoutes = router;
