import {createSlice} from "@reduxjs/toolkit";

// restores cart after refresh
const savedCart = JSON.parse(localStorage.getItem("cart"));

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items:savedCart || []
    },
    reducers:{
        addToCart(state,action){
            const product = action.payload;

            const existingItem = state.items.find(
                item => item.id === product.id
            );

            // check if item already exists
            if(existingItem){
                existingItem.quantity +=1;
            }else{
                state.items.push({...product,quantity: 1});
            }

            localStorage.setItem("cart",JSON.stringify(state.items));
        },

        increaseQuantity(state,action){
            const item = state.items.find(
                item => item.id === action.payload
            );

            if(item){
                item.quantity += 1;
                localStorage.setItem("cart",JSON.stringify(state.items));
            }
        },

        decreaseQuantity(state,action){
            const item = state.items.find(
                item => item.id === action.payload
            );

            if(item.quantity > 1){
                item.quantity -= 1
            }else{
                state.items = state.items.filter(
                    item => item.id !== action.payload
                );
            }

            localStorage.setItem("cart",JSON.stringify(state.items));
        },

        removeFromCart(state,action){
            state.items = state.items.filter(
                item => item.id !== action.payload
            );
            localStorage.setItem("cart",JSON.stringify(state.items));
        },

        clearCart(state){
            state.items=[];
            localStorage.removeItem("cart");
        }
    }
});

export const{addToCart,increaseQuantity,decreaseQuantity,removeFromCart,clearCart} = cartSlice.actions;
export default cartSlice.reducer;