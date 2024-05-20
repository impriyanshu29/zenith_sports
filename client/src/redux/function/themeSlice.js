import {createSlice} from '@reduxjs/toolkit'


const initialState={
    currentTheme:'dark'
}

const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
            changeTheme:(state) =>{
                state.currentTheme =state.currentTheme === 'light' ? 'dark' : 'light';
            }
    }

})

export const{changeTheme} = themeSlice.actions
export default themeSlice.reducer;