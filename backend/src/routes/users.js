import express from "express";
import controller from "../controller/users.js";
const router = express.Router();

router.post("/login", controller.userLogin);

router.post("/register", controller.userRegister);

export default router;
