//Dung rxsslice

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem:(state, action) => {
      const newItem = action.payload
      const exsistingItem = state.cartItems.find(
        item => item.id === newItem.id
      );

      state.totalQuantity++;

      if(!exsistingItem){
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price
        })
      }

      else{
        exsistingItem.quantity++
        exsistingItem.totalPrice = Number(exsistingItem.totalPrice) + Number(newItem.price)
      }

      state.totalAmount = state.cartItems.reduce((total, item) => total +
        Number(item.price) * Number(item.quantity), 0
      )

      // console.log(state.totalQuantity)
      // console.log(state.cartItems)
      // console.log(newItem)
    },

    deleteItem: (state, action) => {
      const id = action.payload
      const exsistingItem = state.cartItems.find(item => item.id === id)
  
      if(exsistingItem){
        state.cartItems = state.cartItems.filter(item => item.id !== id)
        state.totalQuantity = state.totalQuantity - exsistingItem.quantity
      }
  
      state.totalAmount = state.cartItems.reduce((total, item) => total +
        Number(item.price) * Number(item.quantity), 0
      )
    }

  }
});

export const cartActions = cartSlice.actions

export default cartSlice.reducer