import { configureStore } from '@reduxjs/toolkit'

import counterReducer from '../features/counter/counterSlice'
import userReducer from "../features/userCreation/userSlice"
import collectionReducer from "../features/collection/collectionSlice"

export  const store = configureStore({
  reducer: {
    counter:counterReducer,
    user:userReducer,
    collection:collectionReducer
},
})