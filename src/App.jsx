import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeOrder/PlaceOrder'
import Home from './pages/Home/Home'
import Footer from './components/footer/Footer'
import LoginPopUp from './components/loginpopup/LoginPopUp'
import Verify from './pages/verify/Verify'
import Myorder from './pages/Myorder/Myorder'


function App() {

  const [showLogin , setShowLogin] = useState(false)
  return (

    <>
    {showLogin ? <LoginPopUp setShowLogin = {setShowLogin}/> : <></>}
    <div className='app'>
     <Navbar setShowLogin = {setShowLogin}/>
     <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/Cart' element = {<Cart/>}/>
      <Route path='/order' element = {<PlaceOrder/>}/>
      <Route path='/verify' element = {<Verify/>}/>
      <Route path='/myorders' element = {<Myorder/>}/>
     </Routes>
      
    </div>
    <Footer/>
    </>
   
  )
}

export default App;



