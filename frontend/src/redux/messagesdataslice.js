import { createSlice } from "@reduxjs/toolkit";

const messagesDataSlice = createSlice({
  name: "messagesData",
  initialState: {
    messagesData: {
      messages: [],
    },
  },
  reducers: {
    setMessagesData(state, action) {
      const payload = action.payload;
      const messages = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.messages)
        ? payload.messages
        : [];

      state.messagesData = { messages };
    },

    addMessagesData(state, action) {
      if (!state.messagesData || !Array.isArray(state.messagesData.messages)) {
        state.messagesData = { messages: [] };
      }
      state.messagesData.messages.push(action.payload);
    },
  },
});

export const { setMessagesData, addMessagesData } = messagesDataSlice.actions;
export default messagesDataSlice.reducer;