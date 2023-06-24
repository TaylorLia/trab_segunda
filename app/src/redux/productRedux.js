import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    name: '',
    img: '',
    price : 0.0,
    desc : '',
    categoria : '',
    carrinho : 0
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;