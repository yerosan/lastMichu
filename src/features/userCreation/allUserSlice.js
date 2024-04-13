import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
let initialState={
    data:null,
    loading:false,
    error:""
}

const allUserSlice=createSlice({
    name:"allUser",
    initialState,
    reducers:{
        // register:(state, action)=>{
        //     state.loading=action.payload.loading;
        //     state.error=action.payload.error;
        //     state.data=action.payload.data;
        // },
        // loginUser:(state, action)=>{
        //     state.loading=action.payload.loading;
        //     state.error=action.payload.error,
        //     state.data=action.payload.data
        // },
        getAllUsers:(state, action)=>{
            state.loading=action.payload.loading,
            state.error=action.payload.error
            state.data=action.payload.data
        }
    }
})

export const {getAllUsers}=allUserSlice.actions;
export default allUserSlice.reducer;


// export const registerUser=async(data)=>{
//     const dispatch=useDispatch()
//     dispatch(register({loading:false, error:"", data:data}))
//     try{
//          const userRegister=await axios.post("http://localhost:3000/user/user", data)
//          if(userRegister){
//             console.log("User",userRegister)
//             const roleData={userName:data.userName, role:data.role}
//             const createRole=await axios.post("http://localhost:3000/role/create", roleData)
//             if(createRole){
//                 console.log('Role', createRole)
//                 let userData={user:userRegister, role:createRole}
//                 console.log("user data", userData)
//             }else{
//                 console.log("Unable to create role")
//             }
//          }else{
//             console.log("Unable to create user")
//          }
//     }catch(error){
//         console.log(error)
//         dispatch(register({loading:false, error:error, data:null}))
//     }

// }