import express from "express";
import db from "../config/conect.js";
const router = express.Router();

router.patch("/updateuser/:id", async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;

  const exist = await db.any("select * from users where id =$1", [id]);

  if (!exist) {
    return res.status(401).json({
      messsage: `no user with id:${id}`,
    });
  }

  const updateUser = await db.oneOrNone(
    "update users set password = $1 where id = $2 returning id",
    [password, id],
  );
  if (!updateUser) {
    res.status(404).json({
      messsage: "failed update password",
    });
  }
  res.status(200).json({
    messsage: "succees update password",
    id: id,
  });
});

export default router;
