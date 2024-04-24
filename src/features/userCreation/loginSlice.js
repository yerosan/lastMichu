import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
let initialState={
    data:null,
    loading:false,
    error:""
}

const loginSlice=createSlice({
    name:"logins",
    initialState,
    reducers:{
        loginUser:(state, action)=>{
            state.loading=action.payload.loading;
            state.error=action.payload.error,
            state.data=action.payload.data
        },
    }
})

export const {loginUser}=loginSlice.actions;
export default loginSlice.reducer;