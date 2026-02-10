import express from "express";
import jsonwebtoken from "jsonwebtoken";
import models from "../models/users.js";
import db from "../config/conect.js";
import bcrypt from "bcrypt";
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

  const privateKey = process.env.JWT_SECRET;
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

router.post("/register", async (req, res) => {
  const { username, password, email, phone_number } = req.body;
  if (!username || !password || !email || !phone_number) {
    return res.status(400).json({
      message: "There must be no empty forms",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const userRegister = await db.one(
    `insert into users (username , password , email , phone_number) values($1, $2, $3, $4)  RETURNING id, username, email, phone_number`,
    [username, hashPassword, email, phone_number],
  );
  console.log(userRegister);
  if (
    email === userRegister.email ||
    phone_number === userRegister.phone_number
  ) {
    return res
      .status(401)
      .json({ message: "email or phone number is already" });
  }
  res.status(201).json({
    message: "user has been successfully created",
    data: userRegister,
  });
});

export default router;
