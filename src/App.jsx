import React from "react";
import EcomApp from "./components/EcomApp";
import ProductContextProvider from "./context/ProductContextProvider";
import { Flip, ToastContainer, Zoom } from "react-toastify";

function App() {
  return (
    <div>
      <ProductContextProvider>
        <EcomApp />
      </ProductContextProvider>
      <ToastContainer
        position="top-center"
        autoClose={900}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        draggable
        theme="colored"
        transition={Flip}
      />
    </div>
  );
}

export default App;
