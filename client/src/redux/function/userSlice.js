import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    currentUser:null,
    error:null,
    loading:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true;
            state.error = null;
        },
        signInSucess:(state,action)=>{
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },

        signInFail:(state,action) =>{
            
            state.error = action.payload;
            state.loading = false;

        },
        signOutSucess:(state) =>{
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        },
        updateStart:(state)=>{
            state.loading = true;
            state.error = null;
        },
        updateSucess:(state,action)=>{
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        updateFail:(state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart:(state)=>{
            state.loading = true;
            state.error = null;
        },

        deleteUserSucess:(state)=>{
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        },
        deleteUserFail:(state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },
        clearError:(state)=>{
            state.error = null;
        }
    }
})

export const {signInFail,clearError,signInStart,signOutSucess,updateFail,updateSucess,updateStart,signInSucess,deleteUserFail,deleteUserStart,deleteUserSucess} = userSlice.actions;
export default userSlice.reducer;