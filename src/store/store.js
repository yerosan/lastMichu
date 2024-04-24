import { configureStore } from '@reduxjs/toolkit'

import counterReducer from '../features/counter/counterSlice'
import userReducer from "../features/userCreation/userSlice"
import collectionReducer from "../features/collection/collectionSlice"
import allUserReducer from "../features/userCreation/allUserSlice"
import loginReducer from '../features/userCreation/loginSlice'
export  const store = configureStore({
  reducer: {
    logins:loginReducer,
    user:userReducer,
    collection:collectionReducer,
    allUser:allUserReducer
},
})