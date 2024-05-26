import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentAddress: null,
    error:null,
    loading:false,
}

const addressSlice = createSlice({
    name :"address",
    initialState,
    reducers:{
        addAddressStart:(state)=>{
            state.loading = true;
            state.error = null;
        },
        addAddressSuccess:(state,action) =>{
            state.loading = false;
            state.error = null;
            state.currentAddress = action.payload;
        },
        addAddressFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        resetAddress:(state)=>{
            state.loading = false;
            state.error = null;
            state.currentAddress = null;
        }
    }
})


export const { addAddressStart, addAddressSuccess, addAddressFail,resetAddress } = addressSlice.actions;

export default addressSlice.reducer;


