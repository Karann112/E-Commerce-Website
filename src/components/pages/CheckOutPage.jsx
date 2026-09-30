import React, { useContext, useRef, useState } from "react";
import { ProductContext } from "../../context/ProductContextProvider";
import Button from "../shared/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaGooglePay, FaRegCreditCard, FaShoppingBag } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { ImPaypal } from "react-icons/im";
import { toast } from "react-toastify";

function CheckOutPage() {
  const errorDataset = {
    age: null,
    altphoneno: null,
    district:null,
    email: null,
    flat:null,
    fullname: null,
    landmark: null,
    locality: null,
    phoneno:null,
    pincode: null,
  };
  const{setUserEmail} =useContext(ProductContext)
  const { cartPageData, setCartPageData } = useContext(ProductContext);
  const [checkoutForm, setCheckoutForm] = useState(null);
  const [error, setError] = useState(errorDataset);
  const selectPayMode = useRef()
  const navigate = useNavigate();

  console.log("ths is checkout page error set", error);

  //  totalPaybleAmt
  let totalPaybleAmt = cartPageData.reduce((accumulator, currentProduct) => {
    debugger;
    return accumulator + currentProduct.quantity * currentProduct.price * 30;
  }, 0);

  //remove items from checkout page
  function handelCheckoutRemoveItem(checkoutId) {
    debugger;
    let newCheckoutItems = cartPageData.filter(function (ele) {
      return ele.id != checkoutId;
    });

    setCartPageData(newCheckoutItems);
  }

  //handel pay now details submit
  function handelPaynowSubmit(e) {
 
let formIsvalid = true

    e.preventDefault();
    const checkoutDet = new FormData(e.currentTarget);
    const formData = Object.fromEntries(checkoutDet);

    setUserEmail(formData.email)

    console.log(formData);
    debugger;

    //age validation
    if(formData.age.trim().length == 0 ){
       setError( (prev) => {return { ...prev,age : "age is required"}}  )
    formIsvalid = false
    }else if( formData.age.trim().length > 3 ){
      setError( (prev) => {return { ...prev,age : "age is not valid"}}  )
    formIsvalid = false
    }
    else {
      setError( (prev) => {return { ...prev,age : null}}  )
    }

    //alternate phone number validation
      if(formData.altphoneno.trim().length == 0 ){
       setError( (prev) => {return { ...prev,altphoneno : "alternate phone number is required"}}  )
    formIsvalid = false
    }
    else if(formData.altphoneno.trim().length != 10 ){
       setError( (prev) => {return { ...prev,altphoneno : "alternate phone number must be 10 digits"}}  )
    formIsvalid = false
    }
    else {
       setError( (prev) => {return { ...prev,altphoneno : null}}  )
    }


    //phone number validation
      if(formData.phoneno.trim().length == 0 ){
       setError( (prev) => {return { ...prev,phoneno : "phone number is required"}}  )
    formIsvalid = false
    }
    else if(formData.phoneno.trim().length != 10 ){
       setError( (prev) => {return { ...prev,phoneno : "phone number must be 10 digits"}}  )
    formIsvalid = false
    }
    else {
       setError( (prev) => {return { ...prev,phoneno : null}}  )
    }

    //district validation
      if(formData.district.trim().length == 0 ){
       setError( (prev) => {return { ...prev,district : "district is required"}}  )
    formIsvalid = false
    } 
    else {
       setError( (prev) => {return { ...prev,district : null}}  )
    }

    //email validation
      if(formData.email.trim().length == 0 ){
       setError( (prev) => {return { ...prev,email : "email is required"}}  )
    formIsvalid = false
    } 
    else if( 
      !formData.email.trim().includes("@") || 
      !formData.email.trim().includes(".")
  ){
setError( (prev) => {return { ...prev,email : "@ and . is required"}}  )
    formIsvalid = false
    }
    else {
       setError( (prev) => {return { ...prev,email : null}}  )
    }

   //flat validation
   {

     if(formData.flat.trim().length == 0 ){
       setError( (prev) => {return { ...prev,flat : "flat is required"}}  )
       formIsvalid = false
      } 
      else {
        setError( (prev) => {return { ...prev,flat : null}}  )
      }
    }

    //fullname validation
    {
      if(formData.fullname.trim().length == 0 ){
        setError( (prev) => {return { ...prev,fullname : "fullname is required"}}  )
        formIsvalid = false
      } 
      else {
        setError( (prev) => {return { ...prev,fullname : null}}  )
      }
    }

    //landmark validation
    {
      if(formData.landmark.trim().length == 0 ){
        setError( (prev) => {return { ...prev,landmark : "landmark is required"}}  )
        formIsvalid = false
      } 
      else {
        setError( (prev) => {return { ...prev,landmark : null}}  )
      }
    }
    
    //locality validation
    {
      if(formData.locality.trim().length == 0 ){
        setError( (prev) => {return { ...prev,locality : "locality is required"}}  )
        formIsvalid = false
      } 
      else {
        setError( (prev) => {return { ...prev,locality : null}}  )
      }
    }
    
    //pincode validation
    {
      if(formData.pincode.trim().length == 0 ){
        setError( (prev) => {return { ...prev,pincode : "pincode is required"}}  )
        formIsvalid = false
      }
      else if(formData.pincode.trim().length != 6){
setError( (prev) => {return { ...prev,pincode : "pincode must be 6 digit"}}  )
        formIsvalid = false
      } 
      else {
        setError( (prev) => {return { ...prev,pincode : null}}  )
      }
    }
    
    if(!formIsvalid){
      toast.warn("Fill the personal and address details properly")
       return
    }

   selectPayMode.current.classList.remove("hidden")


  }

  return (
    <div className="pt-[9vh] pb-6">
      <div className="text-2xl font-semibold flex justify-center gap-2 mt-3">
        {" "}
        <FaShoppingBag size={28} className="text-gray-600" /> Shopping Summury
      </div>

      <div className="p-7 w-screen flex justify-center items-center flex-wrap gap-9">
        {cartPageData.map(function (ele, i) {
          debugger;
          return (
            <div
              key={i}
              className="flex border border-slate-300 rounded-xl gap-6 shadow-lg p-4 h-65 w-[45%]"
            >
              <div className="w-[40%]">
                <img
                  src={ele.images[0]}
                  className="rounded-xl h-full w-full"
                  alt=""
                />
              </div>

              <div className="pt-2 flex flex-col justify-between w-[60%]">
                <span className="text-xl font-bold">{ele.title}</span>
                <span className="line-clamp-3 text-slate-500">
                  {ele.description}
                </span>
                <div className="flex text-xl font-semibold justify-evenly items-center">
                  <div className="">
                    <span>Price :</span> <span> ₹{ele.price * 30}</span>{" "}
                  </div>
                  <div>
                    <span>Qty :</span> <span> {ele.quantity} </span>{" "}
                  </div>
                  <div>
                    <span>Total :</span>{" "}
                    <span> ₹{ele.quantity * (ele.price * 30)}</span>{" "}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Link
                    className="px-3 py-2 border shadow-md font-semibold rounded-lg text-sm text-[#df8472] border-[#df8472] hover:bg-[#df8472] hover:text-white"
                    to={"/cart"}
                    // onClick={() => handelAddtocart(ele.id)}
                  >
                    Update Order
                  </Link>
                  <Button
                    className={
                      "text-[#df8472] border-[#df8472] hover:bg-[#df8472] hover:text-white"
                    }
                    onClick={() => handelCheckoutRemoveItem(ele.id)}
                  >
                    Remove Item
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xl my-2 font-semibold px-7 ">
        {" "}
        Total Amount :{" "}
        <span className="text-red-500 line-through mx-1">
          {" "}
          ₹{((totalPaybleAmt * 100) / 70).toFixed(2)}{" "}
        </span>{" "}
        <span className="mx-5 "> Flat 30% Off </span> Total Payable amount :
        <span className="text-green-700">
          {" "}
          ₹{totalPaybleAmt.toFixed(2)}{" "}
        </span>{" "}
      </div>
      <form action="" onSubmit={handelPaynowSubmit}>
        <div className="border border-slate-300 mx-7 mt-4 py-2 rounded-lg shadow-md shadow-taupe-200">
          <div className="text-lg font-semibold px-7">
            Enter Personal Details :
          </div>
        {/* /////////// form starts //////////////////  */}
          <div className="px-7 py-3 grid grid-cols-3 gap-4">
             
            <div className="px-3">
              <input
                type="text"
                name="fullname"
                placeholder="Full name"
                className="py-1 px-2 w-full border border-slate-400 rounded-lg"
              />
              <p className="text-sm text-red-600 animate-pulse">
                {error.fullname} 
              </p>
            </div>
            <div className="px-3">
              <input
                type="number"
                name="phoneno"
                placeholder="Phone no"
                className="py-1 px-2 border w-full border-slate-400 rounded-lg"
              />
              <p className="text-sm text-red-600 animate-pulse">
                {error.phoneno}  
              </p>
            </div>

            <div className="px-3">
              <input
                type="number"
                name="altphoneno"
                placeholder="Alternate phone no"
                className="py-1 px-2 w-full border border-slate-400 rounded-lg"
              />
              <p className="text-sm text-red-600 animate-pulse">
                {error.altphoneno}  
              </p>
            </div>

            <div className="px-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="py-1 w-full px-2 border border-slate-400 rounded-lg"
              />
              <p className="text-sm text-red-600 animate-pulse">
                {error.email}  
              </p>
            </div>

            <div className="px-3">
              <input
                type="text"
                name="age"
                placeholder="Age"
                className="py-1 w-full px-2 border border-slate-400 rounded-lg"
              />
              <p className="text-sm text-red-600 animate-pulse">
                {error.age} 
              </p>
            </div>
          </div>
        </div>

        <div className="borde border-slate-300 m-7 py-2 rounded-lg shadow-md shadow-taupe-200">
          <div className="text-lg font-semibold px-7 mt-1">
            Enter Address Details :
          </div>
          <div className="px-7 py-3 grid grid-cols-3 col gap-4">
            <div className="px-3">
              <input
                type="text"
                name="flat"
                placeholder="Flat/House/building name"
                className="w-full py-1 px-2 border border-slate-400 rounded-lg"
              />
              <p className="text-sm text-red-600 animate-pulse ">
                {error.flat}  
              </p>
            </div>

            <div className="px-3">
              <input
                type="text"
                name="locality"
                placeholder="Area/Sector/Locality"
                className="w-full py-1 px-2 border border-slate-400 rounded-lg"
              />
              <p className="text-sm text-red-600 animate-pulse">
                {error.locality}  
              </p>
            </div>

            <div className="px-3">
              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                className="py-1 w-full px-2 border border-slate-400 rounded-lg"
              />
              <p className="text-sm text-red-600 animate-pulse">
                {error.landmark}  
              </p>
            </div>

            <div className="px-3">
              <input
                type="text"
                name="district"
                placeholder="District"
                className="py-1 w-full h-fit px-2 border border-slate-400 rounded-lg"
              />
              <p className="text-sm text-red-600 animate-pulse">
                {error.district} 
              </p>
            </div>
            <div className="px-3">
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                className="py-1 px-2 w-full border border-slate-400 rounded-lg"
              />
              <p className="text-sm text-red-600 animate-pulse">
                {error.pincode}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className={
              "hover:bg-white text-white bg-black text-lg font-semibold hover:text-black rounded-lg border shadow-md p-2 ml-5 w-[30%]"
            }
          >
            {" "}
            PAY ₹{totalPaybleAmt.toFixed(2)}
          </button>
        </div>
      </form>

     <div className="hidden" ref={selectPayMode} >
      <div className="border border-slate-300 rounded-lg m-7 p-5 shadow-lg flex gap-4 items-center ">
        <div className="text-lg font-semibold">Select Payment Method : </div>
        <div className="flex gap-5 font-semibold ">
          <span
            className="p-2 border border-slate-400 px-4 rounded-lg flex gap-2"
            onClick={() => {
              navigate("/CardPayment");
            }}
          >
            {" "}
            <FaRegCreditCard size={23} /> Debit/Credit Card
          </span>
          <span className="p-2 border border-slate-400 px-4 rounded-lg flex gap-2">
            {" "}
            <ImPaypal size={23} /> UPI Payment
          </span>
          <span className="p-2 border border-slate-400 px-4 rounded-lg flex gap-2">
            {" "}
            <FaMoneyBill1Wave size={23} />
            COD
          </span>
        </div>
      </div>
      </div>
    </div>
  );
}

export default CheckOutPage;
