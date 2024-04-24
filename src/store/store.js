import { configureStore } from '@reduxjs/toolkit'

import counterReducer from '../features/counter/counterSlice'
import userReducer from "../features/userCreation/userSlice"
import collectionReducer from "../features/collection/collectionSlice"
import allUserReducer from "../features/userCreation/allUserSlice"
import loginReducer from '../features/userCreation/loginSlice'
import individualReducer from "../features/collection/individualSlice"
import dashboardReducer from '../features/collection/dashboardSlisce'
export  const store = configureStore({
  reducer: {
    logins:loginReducer,
    user:userReducer,
    collection:collectionReducer,
    allUser:allUserReducer,
    individualCollection:individualReducer,
    dashboard:dashboardReducer
},
})