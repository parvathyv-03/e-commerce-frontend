import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utils/api";

const API_URL = "/cart/";

// GET CART
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async() => {
        const response = await api.get(API_URL);
        return response.data;
    }
);

// POST ADD/INCREASE
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async(productId)=>{
        console.log("SENDING:",productId)

        await api.post(API_URL,{product_id:productId});

        // IMPORTANT: REFETCH CART AFTER UPDATE
        const response = await api.get(API_URL);
        return response.data;
    }
);

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async(productId) => {
        await api.delete(API_URL,{
            data:{product_id:productId},
        });

        const response = await api.get(API_URL);
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