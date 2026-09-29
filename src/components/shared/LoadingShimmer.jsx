import React from "react";
import Button from "./Button";

function LoadingShimmer() {
  return (
    <div>
      <div className="text-2xl font-bold text-center animate-pulse mt-2 text-slate-600" > Loading...  </div>
    <div className="grid grid-cols-5 gap-10 p-7">
      {new Array(10).fill(4).map(function (ele,i) {
        return (
          <div key={i} className="space-y-3 border rounded-2xl shadow-md overflow-hidden p-3 border-slate-200 h-93 bg-slate-200 animate-pulse">
            <div className="h-[60%] border border-slate-200 w-full rounded-lg bg-slate-100">
              <img className="object-cover rounded-lg shadow-lg" alt="" />
            </div>

            <div className="h-[40%] w-full space-y-3 mt-2">
              <div className="border-lg w-[40%] border rounded-lg h-6 border-slate-200 bg-slate-100"></div>
              <div className="border-lg border rounded-lg w-full h-6 border-slate-200 bg-gray-100"></div>

              <div className="w-full flex gap-8">
                <div className="border-lg border rounded-lg w-[50%] h-10 border-slate-200 bg-slate-100"></div>
                <div className="border-lg border rounded-lg w-[50%] h-10 border-slate-200 bg-slate-100"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}

export default LoadingShimmer;
