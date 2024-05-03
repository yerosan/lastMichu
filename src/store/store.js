import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/userCreation/userSlice"
import collectionReducer from "../features/collection/collectionSlice"
import allUserReducer from "../features/userCreation/allUserSlice"
import loginReducer from '../features/userCreation/loginSlice'
import individualReducer from "../features/collection/individualSlice"
import dashboardReducer from '../features/collection/dashboardSlisce'
import salseReducer from "../features/salse/salseSlice"
import individualSalseReducer from "../features/salse/individualSalseSlice"
export  const store = configureStore({
  reducer: {
    logins:loginReducer,
    user:userReducer,
    collection:collectionReducer,
    allUser:allUserReducer,
    individualCollection:individualReducer,
    dashboard:dashboardReducer,
    salse:salseReducer,
    individualSalse:individualSalseReducer
},
})