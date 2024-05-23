import {createSlice} from "@reduxjs/toolkit"

const initialState={
    data:null,
    loading:true,
    error:""
}


const individualSlice=createSlice({
    name:"individualOperation",
    initialState,
    reducers:{
        operationalPerUser:(state,action)=>{
            state.loading=action.payload.loading,
            state.data=action.payload.data,
            state.error=action.payload.error
        }, 

    }
})


export const {operationalPerUser}=individualSlice.actions
export default individualSlice.reducer