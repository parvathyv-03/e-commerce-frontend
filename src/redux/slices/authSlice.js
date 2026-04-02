import {createSlice} from "@reduxjs/toolkit";

const savedAuth = JSON.parse(localStorage.getItem("auth"));

const authSlice =createSlice({
    name: "auth",
    initialState: savedAuth ||{
        isLoggedIn:false,
        user:null,
        pendingCartItem : null
    },
    reducers:{
        login:(state,action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            localStorage.setItem("auth",JSON.stringify(state));
        },
        logout:(state) => {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem("auth");
            state.pendingCartItem = null;
        },
        setPendingCartItem(state,action){
            state.pendingCartItem = action.payload;
        },
        clearPendingCartItem(state){
            state.pendingCartItem = null;
        }
    }
});

export const {login,logout,setPendingCartItem,clearPendingCartItem} = authSlice.actions;

export default authSlice.reducer;