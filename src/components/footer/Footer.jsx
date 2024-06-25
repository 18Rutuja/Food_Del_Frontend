import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Stay hungry, stay curious! Explore endless flavors with Tomato. Bon
            appétit!
          </p>
          <div className="social-icon">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
           <a href="https://www.linkedin.com/in/rutuja-rathod-015206231"><img src={assets.linkedin_icon} alt="" /></a> 
          </div>
        </div>

        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
           <a href="/"><li>Home</li></a> 
           <a href="#footer"><li>About us</li></a> 
           <a href="/myorders"><li>Delivery</li></a> 
           <a href="#footer"><li>Privacy Policy</li></a> 
            </ul>
           
        </div>

        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>9209304687</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright"> Copyright 2024 © Tomato.com - All Rights Reserved.</p>
    </div>
  );
}

export default Footer;
