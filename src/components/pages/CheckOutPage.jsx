import React, { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContextProvider";
import Button from "../shared/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaGooglePay, FaRegCreditCard, FaShoppingBag } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { ImPaypal } from "react-icons/im";

function CheckOutPage() {

  const { cartPageData,setCartPageData } = useContext(ProductContext);
  const [checkoutForm,setCheckoutForm] = useState(null)
  const [error,setError] = useState({})
  const navigate = useNavigate()

  console.log("ths is checkout page error set",error);

  //  totalPaybleAmt 
 let totalPaybleAmt = cartPageData.reduce((accumulator, currentProduct) => {
    debugger;
    return accumulator + currentProduct.quantity * currentProduct.price * 30;
  }, 0);

  //remove items from checkout page 
function handelCheckoutRemoveItem(checkoutId){
debugger
  let newCheckoutItems = cartPageData.filter(function(ele){
       return   ele.id != checkoutId
  })

  setCartPageData(newCheckoutItems)

}

//handel pay now details submit
function handelPaynowSubmit(e){
e.preventDefault()
 const checkoutDet = new FormData(e.currentTarget)
 const formData = Object.fromEntries(checkoutDet)
debugger

    if(formData.altphoneno.length != 10 ){
            // return{...error,altphoneno:"Phone number should be 10 digit"}

            setError(function(prev){
                   return {...prev,altphoneno:"Phone number should be 10 digit"}
            })
            return
    }
    if(formData.phoneno.length != 10 ){
            // return{...error,phoneno:"Phone number should be 10 digit"}
             setError(function(prev){
                   return {...prev,phoneno:"Phone number should be 10 digit"}
            })
            return
    }
    if(formData.pincode.length != 6 ){
            // return{...error,phoneno:"Pincode should be 6 digit"}
             setError(function(prev){
                   return {...prev,pincode:"Pincode should be 6 digit"}
            })
            return

    }
  debugger
    

}

  return (
    <div className="pt-[9vh] pb-6">
      <div className="text-2xl font-semibold flex justify-center gap-2 mt-3"> <FaShoppingBag size={28} className="text-gray-600" /> Shopping Summury</div>

      <div className="p-7 w-screen flex justify-center items-center flex-wrap gap-9">
        {
        cartPageData.map(function (ele,i) {

          debugger
          return (
            <div key={i} className="flex border border-slate-300 rounded-xl gap-6 shadow-lg p-4 h-65 w-[45%]">
              <div className="w-[40%]" >
                <img
                  src={ele.images[0]}
                  className="rounded-xl h-full w-full"
                  alt=""
                />
              </div>

              <div className="pt-2 flex flex-col justify-between w-[60%]">
                <span className="text-xl font-bold">
                  {ele.title}
                </span>
                <span className="line-clamp-3 text-slate-500">
                 {ele.description}
                </span>
                <div className="flex text-xl font-semibold justify-evenly items-center">
                  <div  className="" >
                    <span>Price :</span> <span> ₹{ele.price*30}</span>{" "}
                  </div>
                  <div>
                    <span>Qty :</span> <span> {ele.quantity} </span>{" "}
                  </div>
                  <div>
                    <span>Total :</span> <span> ₹{ele.quantity * (ele.price*30)}</span>{" "}
                  </div>
                </div>

                 <div className="flex justify-between items-center" >
                   <Link
                    className=
                      "px-3 py-2 border shadow-md font-semibold rounded-lg text-sm text-[#df8472] border-[#df8472] hover:bg-[#df8472] hover:text-white"
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
         
     
       <div className="text-xl my-2 font-semibold px-7 "> Total Amount : <span className="text-red-500 line-through mx-1" > ₹{(totalPaybleAmt * 100 /70).toFixed(2)} </span> <span className="mx-5 "> Flat 30% Off </span > Total Payable amount :<span className="text-green-700" >  ₹{((totalPaybleAmt).toFixed(2))} </span> </div>
       <form action="" onSubmit={handelPaynowSubmit}>
      <div className="border border-slate-300 mx-7 mt-4 py-2 rounded-lg shadow-md shadow-taupe-200" >
       <div className="text-lg font-semibold px-7" >Enter Personal Details :</div>

       
       <div className="px-7 py-3 grid grid-cols-3 gap-6" >
          <input type="text" name="fullname" placeholder="Full name" className="py-1 px-2 border border-slate-400 rounded-lg" />
<div>
             {true && <p className="text-sm text-red-600">{error.phoneno} phone should be 10 digit</p>}
          <input type="number" name="phoneno" placeholder="Phone no" className="py-1 px-2 border w-full border-slate-400 rounded-lg" />
</div>

      <div>
  {true && <p className="text-sm text-red-600">{error.altphoneno} phone should be 10 digit</p>}
          <input type="number" name="altphoneno" placeholder="Alternate phone no" className="py-1 px-2 border border-slate-400 rounded-lg" />

      </div>

          <input type="email" name="email" placeholder="Email" className="py-1 px-2 border border-slate-400 rounded-lg" />
          <input type="text" name="age" placeholder="Age" className="py-1 px-2 border border-slate-400 rounded-lg" />
       </div>
       </div>

       <div className="borde border-slate-300 m-7 py-2 rounded-lg shadow-md shadow-taupe-200" >
           <div className="text-lg font-semibold px-7 mt-1" >Enter Address Details :</div>
           <div className="px-7 py-3 grid grid-cols-3 gap-6" >
             <input type="text" name="flat" placeholder="Flat/House/building name" className="py-1 px-2 border border-slate-400 rounded-lg" />
             <input type="text" name="locality" placeholder="Area/Sector/Locality" className="py-1 px-2 border border-slate-400 rounded-lg" />
             <input type="text" name="landmark" placeholder="Landmark" className="py-1 px-2 border border-slate-400 rounded-lg" />
             <input type="text" name="district" placeholder="District" className="py-1 px-2 border border-slate-400 rounded-lg" />
           <div>
{true && <p className="text-sm text-red-600">{error.pincode} phone should be 10 digit</p>}
             <input type="text" name="pincode" placeholder="Pincode" className="py-1 px-2 border border-slate-400 rounded-lg" />
           </div>
          
            </div> 
       </div> 
       <div className="w-full flex justify-center" >

       <button type="submit" className={"hover:bg-white text-white bg-black text-lg font-semibold hover:text-black rounded-lg border shadow-md p-2 ml-5 w-[30%]"}
>  PAY ₹{((totalPaybleAmt).toFixed(2))} 
       </button>
               </div>
</form>
               <div className="border border-slate-300 rounded-lg m-7 p-5 shadow-lg flex gap-4 items-center">
                 <div className="text-lg font-semibold">Select Payment Method : </div>
                 <div className="flex gap-5 font-semibold " > 
                  <span className="p-2 border border-slate-400 px-4 rounded-lg flex gap-2"
                  onClick={()=> {
                    navigate("/CardPayment")
                  }}
                  > <FaRegCreditCard size={23} /> Debit/Credit Card</span>
                  <span className="p-2 border border-slate-400 px-4 rounded-lg flex gap-2"> <ImPaypal size={23}/> UPI Payment</span>
                  <span className="p-2 border border-slate-400 px-4 rounded-lg flex gap-2"> <FaMoneyBill1Wave size={23} />COD</span>
                 </div>
               </div>
 </div> 

  );
}

export default CheckOutPage;
