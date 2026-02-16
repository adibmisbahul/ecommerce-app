import bcrypt from "bcrypt";
import db from "../config/conect.js";

const test = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(401).json({
      message: "please insert username and password",
    });
  }
  try {
    const getUser = await db.oneOrNone(
      "select * from users where username = $1",
      [username],
    );
    console.log("user -> ", getUser);
    if (!getUser) {
      return res.send("user tidak ditemukan");
    }

    const passwordUserDatabase = getUser.password;
    console.log("pw in db -> ", passwordUserDatabase);
    const compared = await bcrypt.compare(password, passwordUserDatabase);
    console.log("compared -> ", compared);
    if (compared === false) {
      return res.status(201).json({
        message: "invalid username or password",
      });
    }

    return res.status(201).json({
      message: "succees",
    });
  } catch (error) {
    res.status(401).json({
      message: "error" ,
    });
  }
};

export default test;
