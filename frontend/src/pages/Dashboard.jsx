import Layout from "../layout/Layout";
import Add from "../components/Add";
import BrandIcon from "../components/BrandIcon";
import CardProduct from "../components/CardProduct";
import { FaBoltLightning, FaRegClock, FaTruck } from "react-icons/fa6";
import { IoCart } from "react-icons/io5";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const addToCart = (newItem) => {
    setCart((prev) => {
      console.log(newItem);
      const exits = prev.find((value) => value.id === newItem.id);
      if (exits) {
        prev.map((prevCart) =>
          prevCart.id === newItem.id
            ? { ...prevCart, qty: prevCart.qty + 1 }
            : prevCart,
        );
      }
      return [...prev, { ...newItem, qty: 1 }];
    });
  };

  console.log("cart -> ", cart);

  return (
    <Layout>
      <div className="h-dvh py-2 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className=" flex items-center gap-2 text-zinc-800 font-semibold">
            <span className="p-2 bg-red-600 rounded-full">
              <FaTruck color="white" />
            </span>
            <h2>Banyuurip, Puworejo</h2>
          </div>
          <span className="p-2 bg-red-600 rounded-full">
            <IoCart />
          </span>
        </div>
        <Add />
        <h2 className="text-start text-zinc-800 text-md font-semibold">
          Popular brand
        </h2>
        <div className="flex justify-around">
          <BrandIcon />
        </div>
        <div className="text-zinc-800 font-semibold ">
          <div className="flex justify-between ">
            <div className="flex items-center gap-1">
              <h2>Flash sale</h2>
              <FaBoltLightning color="fbb900" />
            </div>
            <div className="flex gap-2">
              <h2>Ends in</h2>
              <div className="flex items-center gap-1 bg-red-600 px-3 rounded-xl ">
                <FaRegClock color="white" />
                <p className="bg-red-600 text-white">1:45:15</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-around gap-1">
          {data.map((item, index) => {
            return (
              <CardProduct
                key={index}
                image={item.image}
                title={item.title}
                price={item.price}
                onClick={() => addToCart(item)}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
