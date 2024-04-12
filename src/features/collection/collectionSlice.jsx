import {createSlice} from "@reduxjs/toolkit"

const initialState={
    data:null,
    loading:false,
    error:""
}


const collectionSlice=createSlice({
    name:"collection",
    initialState,
    reducers:{
        intervalCollection:(state, action)=>{
            state.loading=action.payload.loading;
            state.data=action.payload.data;
            state.error=action.payload.error;
        }

    }
})


export const {intervalCollection}=collectionSlice.actions
export default collectionSlice.reducer