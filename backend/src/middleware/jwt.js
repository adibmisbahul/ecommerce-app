import jwt from "jsonwebtoken";

export function auth(req, res) {
  const token = req.cookies.token;
  token
    ? res.status(200).json({ message: "already token" })
    : res.status(401).json({ message: "token does not exist" });
  const decode = jwt.verify(token, process.env.JWT_SECRET);
}
