import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  getMyProducts,
  getAllProducts,
  getFavourites,
  getProductDetails,
  addToCart,
  getCartItems,
  addOrder
} from "./productActions";

export const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    allProducts: [],
    myProducts: [],
    favouriteProducts: [],
    productDetails: null,
    cartItems : [],
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ========== Get All Products ==========
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload.data || [];
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== Get My Products ==========
      .addCase(getMyProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.myProducts = action.payload.data || [];
      })
      .addCase(getMyProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== Add Product ==========
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.myProducts.push(action.payload.data);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== Get Favourites ==========
      .addCase(getFavourites.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favouriteProducts = action.payload || [];
      })
      .addCase(getFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== Get Product Details ==========
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload.data || null;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== Get Product Details ==========
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems.push(action.payload.data);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(getCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload.data);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default productSlice.reducer;
