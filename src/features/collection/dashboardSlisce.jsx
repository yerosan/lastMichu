import {createSlice} from "@reduxjs/toolkit"

const initialState={
    data:null,
    loading:true,
    error:""
}


const dashboardSlice=createSlice({
    name:"dashboard",
    initialState,
    reducers:{
        intervalCollection:(state, action)=>{
            state.loading=action.payload.loading;
            state.data=action.payload.data;
            state.error=action.payload.error;
        },

    }
})


export const {intervalCollection}=dashboardSlice.actions
export default dashboardSlice.reducer