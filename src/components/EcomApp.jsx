import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import CartPage from './pages/CartPage'
import WhishList from './pages/WhishList'
import ViewDetails from './pages/ViewDetails'
import CheckOutPage from './pages/CheckOutPage'
import CardPayment from './pages/CardPayment'


function EcomApp() {
  return (
    <div>
        <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/' element={<HomePage/>} />
            {/* <Route path='/' element={<CheckOutPage/>} /> */}
            <Route path='/products' element={<ProductsPage/>} />
            <Route path='/cart' element={<CartPage/>} />
            <Route path='/wishlist' element={<WhishList/>} />
            <Route path='/product/:id' element={<ViewDetails/>} />
            <Route path='/about' element={<AboutPage/>} />
            <Route path='/CheckOut' element={<CheckOutPage/>} />
            <Route path='/CardPayment' element={<CardPayment/>} />
        </Routes>
        <Footer/>
        </BrowserRouter>
      
    </div>
  )
}

export default EcomApp