import Layout from "../layout/Layout";
import Add from "../components/Add";
import BrandIcon from "../components/BrandIcon";
import CardProduct from "../components/CardProduct";
import { FaBoltLightning, FaRegClock, FaTruck } from "react-icons/fa6";
import { IoCart } from "react-icons/io5";
import { useState } from "react";
import { useEffect } from "react";
import userService from "../services/userService";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    async function response() {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/product",
        );
        const data = response.data.data;
        setData(data);
      } catch (error) {
        console.log("canot get product data", error);
      }
    }
    response();
  }, []);

  const addToCart = (newItem) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setModal(true);
      return;
    }
    setCart((prev) => {
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
          {modal && (
            <div className="absolute bg-zinc-100 w-3/4 h-32 rounded-xl content-center top-1/3">
              <p
                className="text-zinc-900 cursor-pointer"
                onClick={() => setModal(false)}
              >
                x
              </p>
              <p className="text-red-500">login terlebih dahulu</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
