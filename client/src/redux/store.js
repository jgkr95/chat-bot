// store.js
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';

const store = configureStore({
  reducer: {
    chatList: chatReducer,
    // Add other reducers if any
  },
});

export default store;
