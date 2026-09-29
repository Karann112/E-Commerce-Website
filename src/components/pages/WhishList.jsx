import React, { useContext, useState } from "react";
import { IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "../shared/Button";
import { ProductContext } from "../../context/ProductContextProvider";

function WhishList() {
  const { wishlistPageData } = useContext(ProductContext);

  console.log("wishlistPageData", wishlistPageData);
  return (
    <div className="pt-[9vh]">
      <div className="flex gap-1 m-5">
        <IoHeart className="my-auto text-red-600" size={27} />{" "}
        <span className="text-2xl font-semibold">Wishlist </span>{" "}
        <span className="text-2xl font-semibold">
          ({wishlistPageData.length})
        </span>{" "}
      </div>
      <div className="grid grid-cols-5 gap-12 p-6">
        {wishlistPageData.map(function (ele, i) {
          return (
            <div
              key={i}
              className="space-y-3 border rounded-2xl shadow-md overflow-hidden p-3 border-slate-200"
            >
              <div className="w-fit">
                <img
                  className="object-cover rounded-lg shadow-lg"
                  src={ele.images[0]}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-lg font-bold line-clamp-1">
                  {ele.title}
                </span>
                <span className="line-clamp-2 text-sm">{ele.description}</span>
                <span className="text-lg font-bold"> Rs.{ele.price * 30}</span>
                <div className="flex justify-between">
                  <Link
                    className="px-3 py-2 border shadow-md font-semibold rounded-lg text-sm text-[#df8472] border-[#df8472]  hover:bg-[#df8472] hover:text-white"
                    to={`/product/${ele.id}`}
                  >
                    View Detials
                  </Link>
                  {/* <Button btntext="Add To Cart" /> */}
                  <Button
                    className={
                      "text-[#df8472] border-[#df8472] hover:bg-[#df8472] hover:text-white"
                    }
                    // onClick={() => handelAddtocart(ele.id)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WhishList;
