import express from "express";
import { auth } from "../middleware/jwt.js";
import { isAdmin } from "../middleware/admin.js";
import controller from "../controller/users.js";
import test from "../controller/test.js";
const router = express.Router();

router.post("/test", test);

router.get("/test/admin", isAdmin, (req, res) => {
  res.status(201).json({
    message: "admin",
  });
});

router.post("/testRegister", controller.userRegister);
router.post("/testLogin", controller.userLogin);
export default router;
