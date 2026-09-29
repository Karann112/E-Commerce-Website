import React, { useRef, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";

function CardPayment() {

 
  let [cardDetails,setcardDetails] = useState([])

  const CardnumberInput = useRef()
  const FullnameInput = useRef()
  const ExpirydateInput = useRef()
  const CVVInput = useRef()
  

  function handelCardSubmit(e){
    e.preventDefault()
            debugger
              console.log(CardnumberInput.current.value);
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
            <span className="text-sm text-slate-400 mx-1" >Enter 12 digit card number</span>
          <input
            type="number"
            placeholder="Card number"
            name="Cardnumber"
            ref={CardnumberInput}
            maxLength={12}
            minLength={12}
            className="py-1 px-2 border border-slate-400 rounded-lg"
          /></div>
          
          <div className="flex flex-col">
            <span className="text-sm text-slate-400 mx-1" >Enter card holder name</span>
          <input
            type="text"
            placeholder="Full name"
            name="Fullname"
             ref={FullnameInput}
            className="py-1 px-2 border border-slate-400 rounded-lg"
          />   </div>

          <div className="flex flex-col">
            <span className="text-sm text-slate-400 mx-1" >Enter 12 digit card number</span>
          <input
            type="date"
            placeholder="Expiry date"
            name="Expirydate"
             ref={ExpirydateInput}
            className="py-1 px-2 border border-slate-400 rounded-lg"
          />   </div>

          <div className="flex flex-col">
            <span className="text-sm text-slate-400 mx-1" >Enter 4 digit CVV</span>
          <input
            type="number"
            placeholder="CVV"
            name="CVV"
             ref={CVVInput}
            className="py-1 px-2 border border-slate-400 rounded-lg"
          />   </div>
        </div>
        
          <button type="submit" className={"hover:bg-white text-white bg-black text-md font-semibold hover:text-black rounded-lg border shadow-md p-2 ml-7 mt-2 mb-3 w-[30%]"}
              > PROCEED
       </button>
</form>
      </div>

         {
          <div className="mt-3 py-4 px-9 w-[40%] flex flex-col justify-between items-center">
          <div className="bg-slate-300 rounded-lg w-[90%] p-5  flex justify-evenly gap-3" > 
            <div className="w-[30%] h-full" >
              <FaCircleUser color="white" className="w-full h-full" />
            </div>
            <div className="h-full flex flex-col justify-evenly gap-4 pr-3" >
               <div className="text-xl font-semibold" >
                Name : Virat Kohli
               </div>
               <div className="text-xl font-semibold" >
                Card number : 178945875689
               </div>
               <div className="text-xl font-semibold" >
                Expiry Date : 12/12/2028
               </div>
               <div className="text-xl font-semibold" >
                CVV : ********5689
               </div>
            </div>
          </div>
            <button className="px-6 py-2 border rounded-lg w-[30%]" >Pay now</button>
          </div>
         }

    </div>
  );
}

export default CardPayment;
