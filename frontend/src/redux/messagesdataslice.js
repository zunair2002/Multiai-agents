import { createSlice } from '@reduxjs/toolkit'

const messagesDataSlice = createSlice({
  name: 'messagesData',
  initialState: {
    messagesData: [],
  },
  reducers: {
    setMessagesData(state, action) {
      state.messagesData = action.payload
    },
  }
})

export const { setMessagesData } = messagesDataSlice.actions
export default messagesDataSlice.reducer
