import {createSlice} from "@reduxjs/toolkit"

const initialState={
    data:null,
    loading:true,
    error:""
}


const dashboardSlice=createSlice({
    name:"operationalDashboard",
    initialState,
    reducers:{
        operationalInterval:(state, action)=>{
            state.loading=action.payload.loading;
            state.data=action.payload.data;
            state.error=action.payload.error;
        },

    }
})


export const {operationalInterval}=dashboardSlice.actions
export default dashboardSlice.reducer