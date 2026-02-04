import db from "../config/conect.js";
const getAllProduct = async () => {
  return await db.any("select  * from product");
};

export default getAllProduct;
