import express from "express";
import jsonwebtoken from "jsonwebtoken";
import models from "../models/users.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "username or password cannot be empty",
    });
  }

  const user = await models.queryLogin(username, password);
  console.log("USER:", user);

  if (!user) {
    return res.status(401).json({
      message: "invalid username or password",
    });
  }

  const payload = {
    id: user.id,
    username: user.username,
    phone_number: user.phone_number,
    email: user.email,
    location: user.location,
  };

  const secret = "ofhh843h98^23(&!@bjsbHSAD7gG";
  const privateKey = secret;
  const token = jsonwebtoken.sign(payload, privateKey, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
      message: "success",
      data: user,
      token,
    });
});

router.post("/register", (req, res) => {
  const { username, password, email, phone_number, localtion } = req.body;
});

export default router;
