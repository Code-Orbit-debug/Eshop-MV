import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
  isLoading: true,
  error: null,
  seller: null,
  sellers: [],
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isLoading = false;
      state.isSeller = true;
      state.seller = action.payload;
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
      state.seller = null;
    })
    //get all sellers Admin
    .addCase("getAllSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllSellerSuccess", (state, action) => {
      state.isLoading = false;
      state.sellers = action.payload;
    })
    .addCase("getAllSellerFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
      state.seller = null;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
