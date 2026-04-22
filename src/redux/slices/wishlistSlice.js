import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const API_URL = "/wishlist/";

// GET WISHLIST
export const fetchWishlist = createAsyncThunk(
    "wishlist/fetchWishlist",
    async() => {
        const response = await api.get(API_URL);
        return response.data;
    }
);

// POST TOGGLE
export const toggleWishlist = createAsyncThunk(
    "wishlist/toggleWishlist",
    async(productId) =>{
        console.log("SENDING:",productId);

        await api.post(API_URL,{product_id:productId});

        const response = await api.get(API_URL);
        return response.data;
    }
);

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState:{
        items: [], 
    },
    reducers:{
        clearWishlist:(state)=>{
            state.items = [];
        }
    },

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

export const {clearWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;