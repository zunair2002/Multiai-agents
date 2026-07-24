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
    },
    updatetitle(state, action) {
      const {conversationId, title} = action.payload
      state.conversationData = state.conversationData.map(conversation => {
        if (conversation._id === conversationId) {
          return {...conversation, title}
        }
        return conversation
      })
      if(state.selectedConversationData._id === conversationId){
        state.selectedConversationData = {...state.selectedConversationData, title}
      }
    }
  }
})

export const { addConversationData, setConversationData, selectedConversationData, updatetitle } = conversationDataSlice.actions
export default conversationDataSlice.reducer
