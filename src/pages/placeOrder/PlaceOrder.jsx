import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

function PlaceOrder() {
  const { getTotalCartAmmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmmount]);

  const OnchangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = food_list.reduce((acc, item) => {
      if (cartItems[item._id] > 0) {
        acc.push({
          ...item,
          quantity: cartItems[item._id]
        });
      }
      return acc;
    }, []);

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmmount() + 2
    };

    try {
      const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      alert("Error placing order");
      console.error("Error placing order:", error);
    }
  };

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'> Delivery Information</p>
        <div className="multi-field">
          <input required name="firstName" onChange={OnchangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={OnchangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={OnchangeHandler} value={data.email} type="email" placeholder='Email id' />
        <input required name='street' onChange={OnchangeHandler} value={data.street} type="text" placeholder='Street' />

        <div className="multi-field">
          <input required name='city' onChange={OnchangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={OnchangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-field">
          <input required name='zipcode' onChange={OnchangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={OnchangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={OnchangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>${getTotalCartAmmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery fee</p>
              <p>${getTotalCartAmmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>${(getTotalCartAmmount() === 0 ? 0 : getTotalCartAmmount() + 2).toFixed(2)}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
