import React, { useContext } from "react";
import { BsCartFill } from "react-icons/bs";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import navbarLogo from "../../assets/NavbarLogo.jpeg"
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContextProvider";
import { IoHeart } from "react-icons/io5";

function Navbar() {
   const { cartPageData,wishlistPageData } =
      useContext(ProductContext);
  return (
    <div className="h-[9vh] fixed z-50 w-screen bg-[#e18673]">
      <div className="flex h-full">
        <div className="w-[50%] h-full">
          <img
            className="h-full ml-6"
            src={navbarLogo}
            alt=""
          />
        </div>

        <ul className="flex justify-end items-center gap-10 w-[50%] pr-10 font-semibold text-lg text-white">
          <li>
            {" "}
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            {" "}
            <Link to={"/products"}>Products</Link>
          </li>
          <li className="relative">
            {" "}
            <Link to={"/cart"}>Cart </Link>{" "}
            <PiShoppingCartSimpleFill size={25} className="absolute bottom-4 left-7.5" />
            <span className="absolute bottom-5 left-10 text-black text-sm" >{cartPageData.length}</span>
          </li>
             <li className="relative">
            {" "}
            <Link to={"/wishlist"}>WhishList</Link>{" "}
             <IoHeart size={25} className="absolute bottom-4 -right-3.5" />
            <span className="absolute bottom-5 -right-1.5 text-black text-sm" >{wishlistPageData.length}</span>
          </li>
          <li>
            {" "}
            <Link to={"/about"}>About</Link>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
