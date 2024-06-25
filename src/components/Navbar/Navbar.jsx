import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

function Navbar({setShowLogin}) {

    const [menu , setMenu] = useState();
  
    const navigate = useNavigate();
    
    const logOut = () => {
        localStorage.removeItem("token")
        setToken("");
        navigate("/");
    }
   
    const {getTotalCartAmmount , token , setToken} = useContext(StoreContext)
  return (
    <div className='navbar'>
       <Link to= "/"> <img src={assets.logo} alt="" className='logo' /></Link> 
        <ul className="navbar-menu">
            <Link to='/' onClick={ () => setMenu("Home")} className={menu==="Home" ? "active" : ""}>Home</Link>
            <a href= '#explore-menu'  onClick={ () => setMenu("Menu")} className={menu==="Menu" ? "active" : ""}>Menu</a>
            <a href= '#app-download'  onClick={ () => setMenu("Mobile-menu")} className={menu==="Mobile-menu" ? "active" : ""}>Mobile-menu</a>
            <a href= '#footer'  onClick={ () => setMenu("Contact us")} className={menu==="Contact us" ? "active" : ""}>Contact us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt=""  />
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className={ getTotalCartAmmount()===0 ? "" : "dot"}></div>
            </div>
            {!token ? <button onClick={() => setShowLogin(true)} className='navbar-button'>Sign in</button>
            : <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className='nav-profile-dropdown'>
                <li onClick={() => navigate('/myorders')}> <img src={assets.bag_icon} alt=""/> 
                <p>Orders</p> 
                </li>
                <hr />
                <li onClick={logOut}> <img src={assets.logout_icon} alt="" />
                <p>Logout</p>  </li>
              </ul>
              </div>
            }
            
        </div>
        
    </div>
  )
}

export default Navbar