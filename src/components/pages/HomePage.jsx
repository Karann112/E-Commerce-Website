import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="pt-[9vh] ">
      <div className="flex flex-col items-center bg-[url('https://template.canva.com/EAFmhQs9dIo/1/0/1600w-qJqqn8_4yFA.jpg')] bg-fixed bg-cover  w-screen mx-auto h-[70vh]" >
         <div className="my-auto flex flex-col items-center" >
            <span className="text-5xl font-bold text-shadow-2xs text-Black p-10">Shop your happieness ! </span>
             <Link
          className="px-3 py-2 shadow-md rounded-lg border-2 font-bold text-3xl text-black bg- hover:scale-120"
          to={"/products"}
        >
           SHOP NOW
        </Link>
         </div>
      </div>
    </div>
  );
}

export default HomePage;
