import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from './userdatasclice.js'
import conversationDataReducer from './conversationsdataslice.js'

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
    conversationData: conversationDataReducer,
  },
})