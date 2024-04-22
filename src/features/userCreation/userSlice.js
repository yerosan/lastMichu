import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
let initialState={
    data:null,
    loading:false,
    error:""
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        register:(state, action)=>{
            state.loading=action.payload.loading;
            state.error=action.payload.error;
            state.data=action.payload.data;
        },
        loginUser:(state, action)=>{
            state.loading=action.payload.loading;
            state.error=action.payload.error,
            state.data=action.payload.data
        },
        getAllUsers:(state, action)=>{
            state.loading=action.payload.loading,
            state.error=action.payload.error
            state.data=action.payload.data
        }
    }
})

export const {register, loginUser, getAllUsers}=userSlice.actions;
export default userSlice.reducer;