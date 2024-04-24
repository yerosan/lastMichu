import {createSlice} from "@reduxjs/toolkit"

const initialState={
    data:null,
    loading:true,
    error:""
}


const individualSlice=createSlice({
    name:"individualCollection",
    initialState,
    reducers:{
        // intervalCollection:(state, action)=>{
        //     state.loading=action.payload.loading;
        //     state.data=action.payload.data;
        //     state.error=action.payload.error;
        // },
        // addingCollection:(state, action)=>{
        //     state.loading=action.payload.loading
        //     state.data=action.payload.data
        //     state.error=action.payload.error
        // },
        collectionPerUser:(state,action)=>{
            state.loading=action.payload.loading,
            state.data=action.payload.data,
            state.error=action.payload.error
        }, 
        // allCollection:(state, action)=>{
        //     state.loading=action.payload.loading,
        //     state.data=action.payload.data,
        //     state.error=action.payload.error
        // }

    }
})


export const {collectionPerUser}=individualSlice.actions
export default individualSlice.reducer