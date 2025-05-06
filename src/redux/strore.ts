import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./slices/chatSlice";
import { authReducer } from "./slices/authSlice";




const store = configureStore({
  reducer: {
    chat:chatReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
