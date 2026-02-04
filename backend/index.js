// require("dotenv").config();
import express from "express";
import cors from "cors";
import UserLogin from "./src/routes/users.js";
import Testing from "./src/routes/testing.js";
import UpdateUser from "./src/routes/updateUsers.js";
import Product from "./src/routes/product.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", UserLogin);
app.use("/api", Testing);
app.use("/api", UpdateUser);
app.use("/api", Product);

app.listen(3000, () => {
  console.log("server runing on port 3000");
});
