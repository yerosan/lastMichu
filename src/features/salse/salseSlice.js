import {createSlice} from "@reduxjs/toolkit"

const initialState={
    data:null,
    loading:false,
    error:""
}

const salseSlice=createSlice({
    name:"salse",
    initialState,
    reducers:{
        intervalSalse:(state, action)=>{
            state.loading=action.payload.loading;
            state.data=action.payload.data;
            state.error=action.payload.error;
        },
        addingSalse:(state, action)=>{
            state.loading=action.payload.loading
            state.data=action.payload.data
            state.error=action.payload.error
        },
        salsePerUser:(state,action)=>{
            state.loading=action.payload.loading,
            state.data=action.payload.data,
            state.error=action.payload.error
        }, 
        allSalse:(state, action)=>{
            state.loading=action.payload.loading,
            state.data=action.payload.data,
            state.error=action.payload.error
        }

    }
})


export const {intervalSalse,allSalse, addingSalse, salsePerUser}=salseSlice.actions
export default salseSlice.reducer