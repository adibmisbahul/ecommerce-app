import express from "express";
import { auth } from "../middleware/jwt.js";
import { isAdmin } from "../middleware/admin.js";
const router = express.Router();

router.get("/test", auth, (req, res) => {
  const request = req;
  console.log(request);
  res.json({
    data: request,
  });
});

router.get("/test/admin", isAdmin, (req, res) => {
  res.status(201).json({
    message: "admin",
  });
});
export default router;
