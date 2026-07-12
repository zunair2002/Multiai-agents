import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from './userdatasclice.js'

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
  },
})