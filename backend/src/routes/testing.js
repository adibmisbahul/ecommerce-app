import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  const request = req;
  console.log(request);
  res.json({
    data: request,
  });
});
export default router;
