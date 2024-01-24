// chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatList: JSON.parse(localStorage.getItem("chats")) || [],
    // chatList: [],
    selectedChatId: null,
  },
  reducers: {
    addChatMessage: (state, action) => {
        state.chatList.push(action.payload);
      localStorage.setItem('chats', JSON.stringify(state.chatList));
      
    },
    selectChat: (state, action) => {
      state.selectedChatId = action.payload;
    },
  },
});

export const { addChatMessage, selectChat } = chatSlice.actions;
export const selectChatList = (state) => state.chatList.chatList;
export const selectSelectedChatId = (state) => state.chatList.selectedChatId;

export default chatSlice.reducer;
