import { createSlice } from "@reduxjs/toolkit";
import {registerUser , loginUser, logoutUser} from "./userActions"
import { getCurrentUser } from "./userActions";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user : {},
    error: null,
    loading: false,
  },
   reducers: {},
   extraReducers: (builder) => {
    builder
    .addCase(registerUser.pending , (state) => {
      state.loading = true;
    }).addCase(registerUser.fulfilled , (state , action) =>{
      state.loading = false
      console.log("Paylaod = " ,action.payload)
      state.user = action.payload
    }).addCase(registerUser.rejected , (state ,action) => {
      state.loading = false
      state.error = action.payload
    })
    .addCase(getCurrentUser.pending , (state) => {
      state.loading = true;
    }).addCase(getCurrentUser.fulfilled , (state , action) =>{
      state.loading = false
      console.log("Paylaod = " ,action.payload)
      state.user = action.payload
    }).addCase(getCurrentUser.rejected , (state ,action) => {
      state.loading = false
      state.error = action.payload
    })
    .addCase(loginUser.pending , (state) => {
      state.loading = true;
    }).addCase(loginUser.fulfilled , (state , action) =>{
      state.loading = false
      console.log("Paylaod = " ,action.payload)
      state.user = action.payload.data
    }).addCase(loginUser.rejected , (state ,action) => {
      state.loading = false
      state.error = action.payload
    })
    .addCase(logoutUser.fulfilled , (state ,action) => {
      state.loading = false
      state.user = action.payload
    })    
   }
})

export default userSlice.reducer