import { createSlice } from '@reduxjs/toolkit'

const conversationDataSlice = createSlice({
  name: 'conversationData',
  initialState: {
    conversationData: []
  },
  reducers: {
    setConversationData(state, action) {
      state.conversationData = action.payload
    },
    addConversationData(state, action) {
      state.conversationData.unshift(action.payload)
    }
  }
})

export const { addConversationData, setConversationData } = conversationDataSlice.actions
export default conversationDataSlice.reducer
