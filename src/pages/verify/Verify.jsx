import React, { useContext, useEffect } from 'react';
import "./Verify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

function Verify() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifypayment = async () => {
      try {
        const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
        if (response.data.success) {
          navigate("/myorders");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        navigate("/"); // Navigate to home or an error page on failure
      }
    };

    verifypayment();

    // No cleanup needed in this case since there are no subscriptions or timers
  }, [success, orderId, url, navigate]);

  return (
    <div className='verify'>
      <div className="spinner">
        {/* You can optionally show a spinner or loading indicator here */}
        <h2>Verifying Payment...</h2>
      </div>
    </div>
  );
}

export default Verify;
