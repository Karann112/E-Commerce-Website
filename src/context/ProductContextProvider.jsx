import React, { useContext, useState } from 'react'
import { createContext } from 'react'


export const ProductContext = createContext(null) 

function ProductContextProvider({children}) {

  const [productPageData,setProductPageData] = useState(null)
  const [cartPageData,setCartPageData] = useState([])
  const [wishlistPageData,setWishlistPageData] = useState([])
  const [userEmail,  setUserEmail] = useState([])

  return (
    <ProductContext.Provider value={ {
        productPageData,
        setProductPageData,
        cartPageData,
        setCartPageData,
        wishlistPageData,
        setWishlistPageData,
        userEmail,
        setUserEmail
      }}>{children}</ProductContext.Provider>
  )
}

export default ProductContextProvider