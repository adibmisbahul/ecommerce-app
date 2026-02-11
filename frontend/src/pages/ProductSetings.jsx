import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CardProduct from "../components/CardProduct";
export default function ProductSetings() {
  const [dataProduct, setDataProduct] = useState();
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

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/product ",
        );
        setDataProduct(response.data.data);
      } catch (error) {
        console.log("canot get data", error);
      }
    };

    loadData();
  }, []);

  console.log(dataProduct);
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
      <div className="flex flex-wrap">
        {dataProduct.map((item, index) => {
          return <CardProduct title={item.title} image={item.image} />;
        })}
      </div>
    </div>
  );
}
