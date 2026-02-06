import models from "../models/users.js  ";

const userLogin = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
        message: ""
    });
  }
};
