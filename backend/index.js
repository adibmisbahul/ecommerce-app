import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserLogin from "./src/routes/users.js";
import Testing from "./src/routes/testing.js";
import UpdateUser from "./src/routes/updateUsers.js";
import Product from "./src/routes/product.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/public", express.static("public"));
app.use("/api", UserLogin);
app.use("/api", Testing);
app.use("/api", UpdateUser);
app.use("/api", Product);
app.listen(3000, () => {
  console.log("server runing on port 3000");
});
