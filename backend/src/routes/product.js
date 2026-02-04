import express from "express";
import db from "../config/conect.js";
const router = express.Router();

router.get("/product", async (req, res) => {
  const getAllProduct = await db.many("select * from products");
  console.log(getAllProduct);
  res.status(200).json({
    massage: "succees",
    data: getAllProduct,
  });
});

router.post("/product", async (req, res) => {
  const { title, price, image, description } = req.body;

  if (price === Number) {
    res.status(400).json({
      message: "type price importan number",
    });
  }

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
