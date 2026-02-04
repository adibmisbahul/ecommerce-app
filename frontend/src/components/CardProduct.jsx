import { FaStar } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

export default function CardProduct(props) {
  const { image, title, price, onClick } = props;
  return (
    <div className="text-zinc-800 rounded-xl shadow-zinc-300  shadow flex flex-col items-start  gap-2 w-45 ">
      <img
        src={image}
        alt=""
        className="rounded-t-xl object-cover aspect-square"
      />
      <div className="flex w-full justify-between font-semibold px-2">
        <h2 className="text-xl">{title}</h2>
        <div className="flex items-center">
          <FaStar color="#ffb900" />
          <h2>4.5</h2>
        </div>
      </div>
      <div className="px-2 pb-2">
        <h2 className="text-start font-semibold text-green-600 text-xl">
          ${price}
        </h2>
        <button className="bg-red-600 px-3 py-2 rounded-md" onClick={onClick}>
          <IoCart color="white" size={25} />
        </button>
      </div>
    </div>
  );
}
