import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const deliveryFee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
  console.log("Favorites State:", favorites);
  }, [favorites]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {

    if (!token) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (!size) {
      return toast.error("Select Size");
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

      try {
          await axios.post(
            backendUrl + "/api/cart/add",
            { itemId, size },
            { headers: { token } }
        );
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log("Error in getCartCount: ", error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          try {
            totalAmount += itemInfo.price * cartItems[items][item];
          } catch (error) {}
        }
      }
    }
    return totalAmount;
  };
  
  const toggleFavorite = async (productId) => {
    try {
      if (!token) {
        toast.error("Please login to save favorites");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        backendUrl + "/api/user/favorite",
        { productId },
        { headers: { token } }
      );

      if (response.data.success) {
        console.log("Updated favorites:", response.data.favorites);

        setFavorites([...response.data.favorites]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

const getFavorites = async () => {
  try {
    if (!token) return;

    const response = await axios.post(
      backendUrl + "/api/user/get-favorites",
      {},
      { headers: { token } }
    );

    if (response.data.success) {
      setFavorites(response.data.favorites);
    }
  } catch (error) {
    console.log(error);
  }
};

const isFavorite = (productId) => {
  return favorites.some(
    (id) => String(id) === String(productId)
  );
};

const getFavoritesCount = () => {
  return favorites.length;
};


  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    getProductsData();

    if (token) {
      getUserCart(token);
      getFavorites();
    }
  }, [token]);
  
  useEffect(() => {
    if (token) {
      getFavorites();
    }
  }, [token]);

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    favorites,
    setFavorites,
    toggleFavorite,
    getFavorites,
    isFavorite,
    getFavoritesCount,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
