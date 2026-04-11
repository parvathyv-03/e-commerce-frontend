import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/cart/"

// GET CART
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async() => {
        const response = await axios.get(API_URL);
        return response.data;
    }
);

// POST ADD/INCREASE
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async(productId)=>{
        console.log("SENDING:",productId)

        await axios.post(API_URL,{product_id:productId});

        // IMPORTANT: REFETCH CART AFTER UPDATE
        const response = await axios.get(API_URL);
        return response.data;
    }
);

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async(productId) => {
        await axios.delete(API_URL,{
            data:{product_id:productId},
        });

        const response = await axios.get(API_URL);
        return response.data;
    }
)

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items : [],
        loading:false,
    },
    reducers:{},

    extraReducers:(builder) => {
        builder
            .addCase(fetchCart.pending,(state) =>{
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled,(state,action)=>{
                state.items=action.payload;
                state.loading=false;
            })
            .addCase(addToCart.fulfilled,(state,action)=>{
                state.items=action.payload;
            })
            .addCase(removeFromCart.fulfilled,(state,action)=>{
                state.items = action.payload;
            });
    },
});

export default cartSlice.reducer;