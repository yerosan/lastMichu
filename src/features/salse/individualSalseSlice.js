import {createSlice} from "@reduxjs/toolkit"

const initialState={
    data:null,
    loading:true,
    error:""
}


const individualSlice=createSlice({
    name:"individualSalse",
    initialState,
    reducers:{
        salsePerUser:(state,action)=>{
            state.loading=action.payload.loading,
            state.data=action.payload.data,
            state.error=action.payload.error
        }, 

    }
})


export const {salsePerUser}=individualSlice.actions
export default individualSlice.reducer