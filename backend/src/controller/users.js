import models from "../models/users.js  ";

const userLogin = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      message: "",
    });
  }
};

const userRegister = async (req, res) => {
  const { username, password, email, phone_number } = req.body;
  if (!username || !password || !email || !phone_number) {
    return res.status(400).json({
      message: "There must be no empty forms",
    });
  }

  const alreadyUser = await models.alreadyUser(username, email, phone_number);
  if (alreadyUser) {
    return res.status(401).json({
      message: "Email or phone number is already registered",
    });
  }

  try {
    const user = await models.userRegister(
      username,
      password,
      email,
      phone_number,
    );

    console.log(user);

    if (user) {
      res.status(201).json({ message: "register succees" });
    } else {
      res.status(401).json({});
    }
  } catch (error) {
    console.log(error);
  }
};

export default { userRegister, userLogin };
