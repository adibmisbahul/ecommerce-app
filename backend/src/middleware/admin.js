import jwt from "jsonwebtoken";

export function isAdmin(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "token not detection" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(401).json({ message: "danied access" });
    }
    next();
  } catch (error) {
    return res.status(403).json({ message: "invalid token" });
  }
}
