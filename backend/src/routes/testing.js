import express from "express";
const router = express.Router();

router.get("/test", async (req, res) => {
  res.status(200).json({
    message: "testing",
  });
});

export default router;
