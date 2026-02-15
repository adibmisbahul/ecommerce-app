import { FaRegHeart } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { Link, Links, Navigate } from "react-router-dom";

export default function Navbar() {
  const linkTo = [
    { link: "/", icon: <GoHome color="#525252" size={25} /> },
    { link: "/", icon: <CiSearch color="#525252" size={25} /> },
    { link: "/", icon: <FaRegHeart color="#525252" size={25} /> },
    {
      link: "/login",
      icon: <MdOutlineAccountCircle color="#525252" size={25} />,
    },
  ];
  return (
    <div className="w-full h-full flex items-center justify-around shadow-sm shadow-zinc-300 ">
      {linkTo.map((item, index) => {
        return (
          <Link to={item.link} key={index}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
}
