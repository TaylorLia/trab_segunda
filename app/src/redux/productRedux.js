import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product : {
      name: '',
      img: '',
      price : 0.0,
      desc : '',
      categoria : '',
      carrinho : 0,
    },
    isFetching : false,
    error : false
  },
  reducers: {
    sendProduct: (state) => {
      state.isFetching = true;
    },
    savedSucess: (state, action) => {
      state.isFetching = false;
      state.error = false;
    },
    savedFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;