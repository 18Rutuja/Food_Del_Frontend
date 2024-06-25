import { createContext, useEffect,useState } from "react";
import axios from 'axios'
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setcartItem] = useState({});
  const url = "http://localhost:4000"
  const [token , setToken] = useState("");
  const [food_list , setfoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setcartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };

  const removeFromCart = async (itemId) => {
    setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove", {itemId}, {headers:{token}})
    }
  };

  useEffect(() => {
     
     async function loadData(){
       await fetchFoodList();
       if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"))
       }
     }
     loadData();
   },[])

  const getTotalCartAmmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  
  const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list")
    setfoodList(response.data.data)
  }
   
  const loadCartData = async (token) => {
    const response = await axios.post(url+"/api/cart/get", {}, {headers:{token}});
    setcartItem(response.data.cartData)
  }

  const contextValue = {
    food_list,
    cartItems,
    setcartItem,
    removeFromCart,
    addToCart,
    getTotalCartAmmount,
    url,
    token,
    setToken,

    
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
