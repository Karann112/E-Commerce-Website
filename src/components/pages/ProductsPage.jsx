import React, { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContextProvider";
import { useEffect } from "react";
import LoadingShimmer from "../shared/LoadingShimmer";
import Button from "../shared/Button";
import { Link } from "react-router-dom";
import { IoHeart } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { AiTwotoneHeart } from "react-icons/ai";
import { toast, Zoom } from "react-toastify";

function ProductsPage() {
  const {
    productPageData,
    setProductPageData,
    setCartPageData,
    cartPageData,
    wishlistPageData,
    setWishlistPageData,
  } = useContext(ProductContext);
  const [loading, setLoading] = useState(true);

  //  Add to cart Click Event
  function handelAddtocart(id) {
    debugger;
    console.log(id);

    let prodExists = cartPageData.find(function (ele) {
      return ele.id == id;
    });

    if (prodExists) {
      toast.warning("Already added in cart");
      return;
    }

    const cartdata = productPageData.filter(function (ele) {
      const { id: eleid } = ele;

      return eleid == id;
    });

    console.log("cartdata", cartdata);
    toast.success("Item added in cart");

    setCartPageData((prev) => [...cartdata, ...prev]);
  }

  //  Add to whishlist Click Event
  function handelAddtoWishlist(id, ee) {
    debugger;

    let prodExists = wishlistPageData.some(function (ele) {
      return ele.id == id;
    });

    if (prodExists) {
      toast.info("Item removed from whishlist");
      const whishlistaddFilter = wishlistPageData.filter(function (ele) {
        const { id: eleid } = ele;
        return eleid != id;
      });
      // let data = whishlistaddFilter[0]
      // let whishlistdata ={...data,whishListed : false}
      setWishlistPageData(whishlistaddFilter);

      let existid = prodExists.id;
      productPageData.forEach((element) => {
        if (element.id == existid) {
          element.whishListed = false;
        }
      });

      console.log("update whishlisted false in product data", productPageData);
    } else {
      toast("Item added in whishlist", {
        style: {
          color: "white",
          backgroundColor: "#ff1414",
        },
      });

      const whishlistaddFilter = productPageData.filter(function (ele) {
        const { id: eleid } = ele;
        return eleid == id;
      });
      let data = whishlistaddFilter[0];
      let whishlistdata = { ...data, whishListed: true };
      setWishlistPageData((prev) => {
        return [whishlistdata, ...prev];
      });

      let existid = whishlistdata.id;
      productPageData.forEach((element) => {
        if (element.id == existid) {
          element.whishListed = true;
        }
      });

      console.log("update whishlisted true in product data", productPageData);
    }
    // ee.currentTarget.classList.toggle("text-white");
    // ee.currentTarget.classList.toggle("text-red-500");
  }

  async function getProducts() {
    try {
      let response = await fetch("https://api.escuelajs.co/api/v1/products");
      let data = await response.json();
      data = data.slice(0, 30);
      data.splice(6, 1);
      data = data.map((product) => ({
        ...product,
        quantity: 1,
        whishListed: false,
      }));
      console.log(data);
      debugger;
      setProductPageData(data);
      setLoading(false);
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(function () {
    debugger;
    if (!productPageData) {
      getProducts();
    } else {
      setLoading(false);
    }
  }, []);

  // if (true) {
  if (loading) {
    return (
      <div className="pt-[9vh]">
        {/* <div className="relative h-screen w-screen flex justify-center items-center" > Loading... </div> */}
        <LoadingShimmer/>
      </div>
    );
  }

  return (
    <div className="pt-[9vh]">
      <div className="grid grid-cols-5 gap-10 p-7">
        {/* card design */}

        {productPageData.map(function (ele, i) {
          
          return (
            <div
              key={i}
              className="space-y-3 border rounded-2xl shadow-md overflow-hidden p-3 border-slate-200"
            >
              <div className="w-fit relative">
                <img
                  className="object-cover rounded-lg shadow-lg"
                  src={ele.images[0]}
                  alt=""
                />
                <IoHeart
                  onClick={(ee) => handelAddtoWishlist(ele.id, ee)}
                  size={25}
                  className={`absolute ${ele.whishListed ? "text-red-500" : "text-white"}  right-2 top-2`}
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
                    onClick={() => handelAddtocart(ele.id)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        {/* card design */}
      </div>
    </div>
  );
}

export default ProductsPage;
