import axios from "axios";
import { useState } from "react";
export default function ProductSetings() {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const data = {
    title: title,
    price: price,
    description: description,
    image: image,
  };

  async function addNewProduct() {
    console.log("data -> ", data);
    await axios.post("http://localhost:3000/api/product", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return (
    <div className="flex flex-col">
      <div className=""></div>
      <input
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button className="p-3 bg-blue-600 rounded-xl" onClick={addNewProduct}>
        add new product
      </button>
    </div>
  );
}
