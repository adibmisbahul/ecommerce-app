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
          import.meta.env.VITE_API_URL + "/product",
        );
        setDataProduct(response.data.data);
      } catch (error) {}
    };

    loadData();
  }, []);

  const handleDelete = async (item) => {
    try {
      const title = item.title;
      const response = await axios.delete(
        import.meta.env.VITE_API_URL + "/product",
        {
          data: {
            title: title,
          },
        },
      );
      setDataProduct((prev) => prev.filter((p) => p.id !== item.id));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
        {dataProduct ? (
          <>
            {console.log("already data")}
            {dataProduct.map((item, index) => {
              return (
                <CardProduct
                  key={index}
                  title={item.title}
                  image={item.image}
                  buttonTittle={"delete"}
                  onClick={() => handleDelete(item)}
                />
              );
            })}
          </>
        ) : (
          <>
            {console.log("kosong")}
            <p>loading</p>
          </>
        )}
      </div>
    </div>
  );
}
