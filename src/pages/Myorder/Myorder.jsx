import React, { useContext, useEffect, useState } from "react";
import "./Myorder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets"; // Assuming this is correctly imported

function Myorder() {
  const [orders, setOrders] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Handle error state or display an error message
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const trackOrder = async () => {
    await fetchOrders(); // Refresh orders when tracking is clicked
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {orders.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <p>
              {order.items.map((item, idx) => (
                <span key={idx}>
                  {item.name} x {item.quantity}
                  {idx < order.items.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>
            <button onClick={trackOrder}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Myorder;
