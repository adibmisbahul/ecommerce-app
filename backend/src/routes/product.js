import express from "express";
import db from "../config/conect.js";
import multer from "multer";
import path from "path";
import { auth } from "../middleware/jwt.js";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();

router.get("/product", async (req, res) => {
  const getAllProduct = await db.many("select * from products");
  res.status(200).json({
    massage: "succees",
    data: getAllProduct,
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "public", "product"));
  },
  filename: function (req, file, cb) {
    const title = req.body.title;
    const ext = path.extname(file.originalname);
    const safeTitle = title.toLowerCase().replace(/[^a-z0-9]/g, "-");
    cb(null, `${safeTitle}${ext}`);
  },
  fileFilter: function (req, file, cb) {
    cb(null);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("File harus gambar"), false);
    }
    cb(null, true);
  },
});

router.post("/product", upload.single("image"), async (req, res) => {
  const { title, price, description } = req.body;
  const image = `${req.protocol}://${req.host}/public/product/${req.file.filename}`;

  console.log(req.body);
  console.log(req.file.filename);

  if (!title || !price || !image || !description) {
    return res.status(400).json({
      message: "please insert full data",
    });
  }

  const addNewProduct = await db.any(
    "insert into products (title, price, description , image) values ($1, $2 , $3 , $4) returning id",
    [title, price, description, image],
  );

  res.status(201).json({
    message: "created product",
    data: addNewProduct,
  });
});

router.patch("/product/:id", async (req, res) => {
  const { title, price, description, image } = req.body;
  const { id } = req.params;
  const updateProduct = await db.any(
    " UPDATE products SET title = COALESCE($1, title), price = COALESCE($2, price),description = COALESCE($3, description), image = COALESCE($4, image) WHERE id = $5",
    [title, price, description, image, id],
  );

  res.json({ message: "Product updated", data: updateProduct });
});

router.delete("/product", async (req, res) => {
  const { title } = req.body;
  const deleteProduct = await db.one(
    "delete from products where title=$1 returning title , price , description",
    [title],
  );

  res.status(200).json({
    message: "deleted data",
    data: deleteProduct,
  });
});

export default router;
