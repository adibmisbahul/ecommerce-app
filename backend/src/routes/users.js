import express from "express";
import jsonwebtoken from "jsonwebtoken";
import models from "../models/users.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(404).json({
      message: "username or password cannot be empty",
    });
  }
  const query = await models.queryLogin(username, password);
  console.log(query);

  const payload = {
    id: query.id,
    username: query.username,
    phone_number: query.phone_number,
    email: query.email,
    location: query.location,
  };

  const secret = "ofhh843h98^23(&!@bjsbHSAD7gG";
  const privateKey = Date.now() + secret;
  const token = jsonwebtoken.sign(payload, privateKey);
  if (query) {
    return res.status(200).json({
      message: "success",
      data: {
        username: query.username,
        email: query.email,
        location: query.location,
      },
      token: token,
    });
  } else {
    return res.status(404).json({
      message: "invalid username or password",
    });
  }
});

export default router;
