import React, { useContext, useEffect, useState } from "react";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { PiMoneyWavyFill } from "react-icons/pi";
import { SiMoneygram } from "react-icons/si";
import { useParams } from "react-router-dom";
import Button from "../shared/Button";
import { ProductContext } from "../../context/ProductContextProvider";
import { toast } from "react-toastify";

function ViewDetails() {
  const { id: productId } = useParams();

  const {
    cartPageData,
    setCartPageData,
    productPageData,
    wishlistPageData,
    setWishlistPageData,
  } = useContext(ProductContext);

  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);
  const [productDetails, setProductDetails] = useState();

  // fetching data for single product
  async function getSingleProduct() {
    debugger;
    try {
      const data = await fetch(
        `https://api.escuelajs.co/api/v1/products/${productId}`,
      );
      const response = await data.json();
      debugger;
      console.log("single prod data", response);

      setProductDetails(response);
      setLoad(false);
    } catch (error) {}
  }

  //add to cart product
  function handelAddtocart(id) {
    debugger;
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
  function handelAddtoWishlist(id) {
    debugger;

    let prodExists = wishlistPageData.find(function (ele) {
      return ele.id == id;
    });

    if (prodExists) {
      toast.info("Item already in whishlist");
      return;
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
    ee.currentTarget.classList.toggle("text-white");
    ee.currentTarget.classList.toggle("text-red-500");
  }

  useEffect(function () {
    getSingleProduct();
  }, []);

  // if (true) {
   if (load) {
    return (
      <div className="pt-[9vh] ">

          <div className="text-2xl font-bold text-slate-700 animate-bounce mt-8 text-center" > Loading... </div>

        <div className="w-screen h-fit flex justify-center gap-15 mt-[9vh] animate-bounce">

            <div className="w-[22%] h-50 border bg-slate-300 border-slate-200 rounded-lg "></div>
            <div className="w-[22%] h-50 border bg-slate-300 border-slate-200 rounded-lg "></div>
            <div className="w-[22%] h-50 border bg-slate-300 border-slate-200 rounded-lg "></div>
        </div>

        <div className="space-y-3 w-full  px-50 my-5 animate-bounce" >
           <div className="border w-[30%] bg-slate-300 border-slate-200 h-6 rounded-lg"></div>
           <div className="border w-[90%] bg-slate-300 border-slate-200 h-6 rounded-lg"></div>
           <div className="border w-[50%] bg-slate-300 border-slate-200 h-6 rounded-lg"></div>
           <div className="border w-[20%] bg-slate-300 border-slate-200 h-6 rounded-lg"></div>
        </div>
            
          
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-slate-200 pt-[9vh]">
      <div className="w-[75%] bg-white my-13 p-6 space-y-3 rounded-xl">
        <div className="grid grid-cols-3 gap-6">
          <img src={productDetails.images[0]} className="rounded-xl" alt="" />
          <img src={productDetails.images[1]} className="rounded-xl" alt="" />
          <img src={productDetails.images[2]} className="rounded-xl" alt="" />
        </div>
        <div className="p-2 border rounded-lg text-sm w-fit border-slate-400 shadow-lg">
          <span className="font-semibold text-slate-500">Category :</span>{" "}
          <span className="font-semibold text-slate-500">
            {productDetails.category.name}
          </span>
        </div>
        <div className="text-2xl font-bold">{productDetails.title}</div>
        <div className="text-lg font-semibold text-slate-700">
          {productDetails.description}
        </div>

        <div className="text-xl space-x-2">
          {" "}
          <span className="font-bold">30% off,</span>{" "}
          <span className="line-through text-red-600">
            {" "}
            ₹ {((productDetails.price * 30 * 100) / 70).toFixed(2)}{" "}
          </span>{" "}
          <span className="font-bold text-green-600">
            ₹ {productDetails.price * 30}{" "}
          </span>{" "}
        </div>

        <div className="p-6 flex justify-evenly rounded-lg bg-slate-200">
          <div className="bg-white shadow-lg rounded-lg font-semibold p-3">
            {" "}
            <SiMoneygram className="w-full align-middle" /> 7 Days Return
          </div>
          <div className="bg-white shadow-lg rounded-lg font-semibold p-3">
            {" "}
            <PiMoneyWavyFill className="w-full align-middle" /> Cash On Delivery
          </div>
          <div className="bg-white shadow-lg rounded-lg font-semibold p-3">
            {" "}
            <FaHeartCircleCheck className="w-full align-middle" /> Trusted
            Products
          </div>
          <div className="bg-white shadow-lg rounded-lg font-semibold p-3">
            {" "}
            <IoShieldCheckmarkSharp className="w-full align-middle" /> Felicity
            Assured
          </div>
        </div>

        <div className="flex gap-8 mt-6">
          <Button
            className={
              "w-50 text-[#f76042] border-[#df8472] hover:bg-[#df8472] hover:text-white"
            }
            onClick={() => handelAddtocart(productId)}
          >
            Add to Cart
          </Button>
          <Button
            className={
              "w-50 text-[#f76042] border-[#df8472] hover:bg-[#df8472] hover:text-white"
            }
            onClick={() => handelAddtoWishlist(productId)}
          >
            Add to Wishlist
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
