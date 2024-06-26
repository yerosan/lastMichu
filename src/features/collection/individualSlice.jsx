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
        collectionPerUser:(state,action)=>{
            state.loading=action.payload.loading,
            state.data=action.payload.data,
            state.error=action.payload.error
        }, 

    }
})


export const {collectionPerUser}=individualSlice.actions
export default individualSlice.reducer