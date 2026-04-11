import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/wishlist/";

// GET WISHLIST
export const fetchWishlist = createAsyncThunk(
    "wishlist/fetchWishlist",
    async() => {
        const response = await axios.get(API_URL);
        return response.data;
    }
);

// POST TOGGLE
export const toggleWishlist = createAsyncThunk(
    "wishlist/toggleWishlist",
    async(productId) =>{
        console.log("SENDING:",productId);

        await axios.post(API_URL,{product_id:productId});

        const response = await axios.get(API_URL);
        return response.data;
    }
);

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState:{
        items: [], 
    },
    reducers:{},

    extraReducers:(builder) => {
        builder
            .addCase(fetchWishlist.fulfilled,(state,action)=>{
                state.items = action.payload;
            })
            .addCase(toggleWishlist.fulfilled,(state,action)=>{
                state.items = action.payload;
            });
    },
});

export default wishlistSlice.reducer;