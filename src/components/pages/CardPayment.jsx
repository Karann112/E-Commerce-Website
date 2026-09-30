import React, { useContext, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaCircleUser } from "react-icons/fa6";
import { toast } from "react-toastify";
import { ProductContext } from "../../context/ProductContextProvider";

function CardPayment() {

  const{userEmail,setUserEmail} =useContext(ProductContext)


  const cardErrorObj = {
    CVV: null,
    Cardnumber: null,
    Expirydate: null,
    Fullname:null
  };
 const debitCarddiv =useRef()
  let [generateCardData, setGenerateCardData] = useState([]);
  let [carderror, setcardError] = useState(cardErrorObj);



  //email js code function

  const sendEmail = async () => {
  try {
    const response = await emailjs.send(
      "service_9023mkt",
      "template_to50tvv",
      {
        email: userEmail,
        user_name: "Customer",
      },
      {
        publicKey: "0WvFDZbEUOPIC3sw1",
      }
    ); 
    toast.success("Shopping done successfully!");

  } catch (error) {
    console.error("EmailJS error:", error);
    toast.error("Failed to send email.");
  }
};




  function handelCardSubmit(e) {
    debugger;
    e.preventDefault();
    let isDebitValid = true
    const cardForm = new FormData(e.currentTarget);
    const cardData = Object.fromEntries(cardForm);
    setGenerateCardData([cardData])

     //CVV validation
      if(cardData.CVV.trim().length == 0 ){
       setcardError( (prev) => {return { ...prev,CVV : "CVV is required"}}  )
    isDebitValid = false
    }
    else if(cardData.CVV.trim().length != 4 ){
       setcardError( (prev) => {return { ...prev,CVV : "CVV number must be 4 digits"}}  )
    isDebitValid = false
    }
    else {
       setcardError( (prev) => {return { ...prev,CVV : null}}  )
    }
    
    //Cardnumber validation
      if(cardData.Cardnumber.trim().length == 0 ){
       setcardError( (prev) => {return { ...prev,Cardnumber : "Cardnumber is required"}}  )
    isDebitValid = false
    }
    else if(cardData.Cardnumber.trim().length != 12 ){
       setcardError( (prev) => {return { ...prev,Cardnumber : "Cardnumber number must be 12 digits"}}  )
    isDebitValid = false
    }
    else {
       setcardError( (prev) => {return { ...prev,Cardnumber : null}}  )
    }


    //Fullname validation
     
     if(cardData.Fullname.trim().length == 0 ){
        setcardError( (prev) => {return { ...prev,Fullname : "Fullname is required"}}  )
        isDebitValid = false
      } 
      else {
        setcardError( (prev) => {return { ...prev,Fullname : null}}  )
      }

    //Expirydate validation
     
     if(cardData.Expirydate.trim().length == 0 ){
        setcardError( (prev) => {return { ...prev,Expirydate : "Expirydate is required"}}  )
        isDebitValid = false
      } 
      else {
        setcardError( (prev) => {return { ...prev,Expirydate : null}}  )
      }

       if(!isDebitValid){
            toast.warn("Fill the personal and address details properly")
             return
          }
             toast.success("Payment-card proceeds successfully")
   debitCarddiv.current.classList.remove("hidden")
   debitCarddiv.current.classList.add("flex")

  }

  return (
    <div className="pt-[9vh] flex">
      <div className="border border-slate-300 m-7 py-2 rounded-lg shadow-md shadow-taupe-200 w-[50%]">
        <div className="text-lg font-semibold px-7 mt-1">
          Enter Card Details :
        </div>
        <form onSubmit={handelCardSubmit} action="">
          <div className="px-7 py-2 grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <span className="text-sm text-slate-400 mx-1">
                Enter 12 digit card number
              </span>
              <input
                type="number"
                placeholder="Card number"
                name="Cardnumber"
               
                maxLength={12}
                minLength={12}
                className="py-1 px-2 border border-slate-400 rounded-lg"
              />
               <p className="text-sm text-red-600 animate-pulse">
                {carderror.Cardnumber}
              </p>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-slate-400 mx-1">
                Enter card holder name
              </span>
              <input
                type="text"
                placeholder="Full name"
                name="Fullname"
               
                className="py-1 px-2 border border-slate-400 rounded-lg"
              />{" "}
               <p className="text-sm text-red-600 animate-pulse">
                {carderror.Fullname}
              </p>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-slate-400 mx-1">
                Enter 12 digit card number
              </span>
              <input
                type="date"
                placeholder="Expiry date"
                name="Expirydate"
            
                className="py-1 px-2 border border-slate-400 rounded-lg"
              />  <p className="text-sm text-red-600 animate-pulse">
                {carderror.Expirydate}
              </p>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-slate-400 mx-1">
                Enter 4 digit CVV
              </span>
              <input
                type="number"
                placeholder="CVV"
                name="CVV"
                className="py-1 px-2 border border-slate-400 rounded-lg"
              />{" "} <p className="text-sm text-red-600 animate-pulse">
                {carderror.CVV}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className={
              "hover:bg-white text-white bg-black text-md font-semibold hover:text-black rounded-lg border shadow-md p-2 ml-7 mt-2 mb-3 w-[30%]"
            }
          >
            {" "}
            PROCEED
          </button>
        </form>
      </div>

      {
              generateCardData.map(function(element,index){
                return (
                 
 <div ref={debitCarddiv} key={index} className="mt-3 py-4 px-9 w-[40%] hidden flex-col justify-evenly items-center text-lg" >
          <div className="bg-slate-300 rounded-lg w-[90%] p-5 shadow-md flex justify-evenly gap-3">
            <div className="w-[30%] h-full">
              <FaCircleUser color="white" className="w-full h-full" />
            </div>
            <div className="h-full flex flex-col justify-evenly gap-4 pr-3">
              <div className=" font-semibold">Name : {element.Fullname}</div>
              <div className=" font-semibold">
                Card number :  {element.Cardnumber}
              </div>
              <div className=" font-semibold">
                Expiry Date : {element.Expirydate}
              </div>
              <div className=" font-semibold">CVV : ********{element.CVV}</div>
            </div>
          </div>
          <button
          onClick={sendEmail}
           className="px-6 mt-4 py-2 hover:bg-white hover:text-black shadow-lg border  rounded-lg w-[30%] text-white bg-black">
            Pay now
          </button>
        </div>
                )
              }) 
       
      }
    </div>
  );
}

export default CardPayment;
