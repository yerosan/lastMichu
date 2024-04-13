import { configureStore } from '@reduxjs/toolkit'

import counterReducer from '../features/counter/counterSlice'
import userReducer from "../features/userCreation/userSlice"
import collectionReducer from "../features/collection/collectionSlice"
import allUserReducer from "../features/userCreation/allUserSlice"

export  const store = configureStore({
  reducer: {
    counter:counterReducer,
    user:userReducer,
    collection:collectionReducer,
    allUser:allUserReducer
},
})