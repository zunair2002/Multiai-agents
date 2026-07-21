import { createSlice } from '@reduxjs/toolkit'

const conversationDataSlice = createSlice({
  name: 'conversationData',
  initialState: {
    conversationData: [],
    selectedConversationData: null
  },
  reducers: {
    setConversationData(state, action) {
      state.conversationData = action.payload
    },
    addConversationData(state, action) {
      state.conversationData.unshift(action.payload)
    },
    selectedConversationData(state, action) {
      state.selectedConversationData = action.payload
    }
  }
})

export const { addConversationData, setConversationData, selectedConversationData } = conversationDataSlice.actions
export default conversationDataSlice.reducer
