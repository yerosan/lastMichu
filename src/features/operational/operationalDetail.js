import {createSlice} from "@reduxjs/toolkit"

const initialState={
    data:null,
    loading:true,
    error:""
}


const operationalSlice=createSlice({
    name:"operationalDetail",
    initialState,
    reducers:{
        operationalDetail:(state, action)=>{
            state.loading=action.payload.loading;
            state.data=action.payload.data;
            state.error=action.payload.error;
        },

    }
})


export const {operationalDetail}=operationalSlice.actions
export default operationalSlice.reducer