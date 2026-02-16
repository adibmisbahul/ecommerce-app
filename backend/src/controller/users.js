import models from "../models/users.js  ";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      message: "tidak boleh ada form yang kosong",
    });
  }

  console.log("data -> ", req.body);

  try {
    const user = await models.userLogin(username, password);
    console.log("user -> ", user);
    if (!user) {
      return res.status(401).json({ message: "invalid username or password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      phone_number: user.phone_number,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    console.log("token -> ", token);

    return res.status(201).json({
      message: "login succeesfully",
      data: user.username,
      token: token,
    });
  } catch (error) {
    res
      .status(401)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "error" + error });
  }
};

const userRegister = async (req, res) => {
  const { username, password, email, phone_number } = req.body;
  if (!username || !password || !email || !phone_number) {
    return res.status(400).json({
      message: "There must be no empty forms",
    });
  }
  try {
    const alreadyUser = await models.alreadyUser(username, email, phone_number);
    console.log("alread -> ", alreadyUser);
    if (alreadyUser) {
      return res.status(401).json({
        message: "Email or phone number is already registered",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await models.userRegister(
      username,
      hashPassword,
      email,
      phone_number,
    );

    console.log("user -> ", user);

    if (user) {
      res.status(201).json({ message: "register succees" });
    } else {
      res.status(401).json({ message: "failed to register " });
    }
  } catch (error) {
    console.log(error);
  }
};

export default { userRegister, userLogin };
