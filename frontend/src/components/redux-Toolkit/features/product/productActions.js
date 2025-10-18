import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMyProducts = createAsyncThunk(
  "getMyProducts",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/user/myProducts", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
      return result;
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);
export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/user/products", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
      return result;
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);
export const getProductDetails = createAsyncThunk(
  "getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/productDetails/${id}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("product details API Response:", result);
      return result;
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "addProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/user/addProduct", {
        method: "POST",
        body: data, // ✅ Just pass FormData directly
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      console.log("Product Added Successfully", result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "favorites/addToFavorites",
  async (ProductId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/favourite/${ProductId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ ProductId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add to favorites");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getFavourites = createAsyncThunk(
  "getFavourites",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/user/favourite", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
      return result.data;
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "addToCart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/user/addToCart", {
        method: "POST",
        credentials: "include",
         headers: {
          "Content-Type": "application/json", // ✅ required for Express to parse JSON
        },
        body: JSON.stringify({ id }),
      });
      console.log("Product Id: ", id);
      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
      return result.data;
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/user/cartItems", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result.data; // Assuming { data: [...] } format
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addOrder = createAsyncThunk(
  "product/addOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/user/addOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to place order");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

