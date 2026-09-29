import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContextProvider";
import { Link } from "react-router-dom";
import { PiShoppingCartFill } from "react-icons/pi";

function CartPage() {
  const { productPageData, setProductPageData, setCartPageData, cartPageData } =
    useContext(ProductContext);

  // functio for quantity decrement
  function handleDecrementQuantity(prodId) {
    debugger;
    let decrementProd = cartPageData.map(function (elem) {
      if (elem.quantity > 1) {
        if (elem.id === prodId) {
          return { ...elem, quantity: elem.quantity - 1 };
        }
      }

      return elem;
    });

    console.log(decrementProd);
    setCartPageData(decrementProd);
  }

  // functio for quantity decrement
  function handleIncrementQuantity(prodId) {
    debugger;
    let decrementProd = cartPageData.map(function (elem) {
      if (elem.id === prodId) {
        return { ...elem, quantity: elem.quantity + 1 };
      }

      return elem;
    });

    console.log(decrementProd);
    setCartPageData(decrementProd);
  }

  // function for handel delete item from cart
  function handleRemoveProductFromCart(delid) {
    debugger;
    let delcartdata = cartPageData.filter(function (ele) {
      return ele.id !== delid;
    });

    setCartPageData(delcartdata);
  }

  let totalProdQtyCount = cartPageData.reduce((accumulator, currentProduct) => {
    debugger;
    return accumulator + currentProduct.quantity;
  }, 0);

  let totalPaybleAmt = cartPageData.reduce((accumulator, currentProduct) => {
    debugger;
    return accumulator + currentProduct.quantity * currentProduct.price * 30;
  }, 0);

  if (cartPageData.length == 0) {
    return (
      <div className="h-[50vh] flex flex-col justify-center items-center gap-5 pt-[9vh]" >
        <div className="text-3xl text-slate-500" >Your cart is empty</div>
        <Link
          className="px-3 py-2 border shadow-md font-semibold rounded-lg text-sm text-[#df8472] border-[#df8472] hover:scale-120  hover:bg-[#df8472] hover:text-white"
          to={"/products"}
        >
           SHOP NOW
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-[9vh]" >
      <div className="flex">
        {/* products */}

        <div className=" w-[70%] space-y-8 p-5">
          {/* cart card */}

          {cartPageData.map(function (ele) {
            return (
              <div className="flex justify-between border w-full p-3 rounded-md border-slate-200 shadow-md">
                <div className="">
                  <img
                    className="object-cover rounded-lg shadow-md h-70"
                    src={ele.images[0]}
                    alt=""
                  />
                </div>

                <div className="w-[55%] p-2 flex flex-col justify-between">
                  <div className="text-2xl"> {ele.title}</div>
                  <span className="">{ele.description}</span>
                  <div>
                    <div className="space-y-2">
                      <span className="capitalize">
                        price :
                        <span className="font-medium">
                          {" "}
                          Rs.{ele.price * 30}
                        </span>{" "}
                        | calculated price :
                        <span className="font-medium text-xl">
                          {" "}
                          Rs.{ele.price * 30 * ele.quantity}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 flex flex-col justify-center  items-center max-sm:flex-row max-sm:gap-4 max-sm:justify-center max-sm:py-2 max-sm:space-y-0">
                  <div className="flex items-center">
                    {/* handle cart product quantity decrement */}
                    <button
                      onClick={() => handleDecrementQuantity(ele.id)}
                      className="bg-blue-600 text-white p-2 rounded cursor-pointer duration-200 active:scale-105"
                    >
                      <Minus />
                    </button>
                    <span className="px-2 text-xl font-semibold border border-slate-100">
                      {ele.quantity}
                    </span>
                    {/* handle cart product quantity increment */}
                    <button
                      onClick={() => handleIncrementQuantity(ele.id)}
                      className="bg-blue-600 text-white p-2 rounded cursor-pointer duration-200 active:scale-105"
                    >
                      <Plus />
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => handleRemoveProductFromCart(ele.id)}
                      className="bg-red-600 text-white p-2  cursor-pointer duration-200 active:scale-105 px-4 py-2 rounded font-medium flex items-center gap-1"
                    >
                      <Trash2 />
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* price calculation */}
        <div className="w-[30%]">
          <div className="my-8 px-4 text-[18px] space-y-2">
            <div className="flex justify-between items-center ">
              <span>Total Product</span>
              <span className="font-medium"> {cartPageData.length}</span>
            </div>
            <div className="flex justify-between items-center ">
              <span>Total Product quantity</span>
              <span className="font-medium"> {totalProdQtyCount} </span>
            </div>
            <div className="flex justify-between items-center ">
              <span>Delivery Charges</span>
              <span className="font-medium line-through">₹50</span>
            </div>
            <div className="border border-slate-200" />
            <div className="flex justify-between items-center ">
              <span className="font-semibold text-xl">Total Amount</span>
              <span className="font-medium">₹ {totalPaybleAmt} </span>
            </div>
            <div>
              {
                <Link
                  to={"/CheckOut"}
                  className="block text-center cursor-pointer bg-green-600 text-white font-semibold w-full mt-8 px-4 py-2 rounded "
                >
                  Checkout
                </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
