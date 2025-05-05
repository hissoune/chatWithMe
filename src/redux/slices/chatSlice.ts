import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllMessages, sendMessage } from "../../services/api/chatApi";

interface Message {
  sender: string;
  message: any;
}

export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (userId:string) => {
    const messages = await   getAllMessages(userId); 
    return messages;
    }
);

export const sendMessageAction = createAsyncThunk(
  "chat/sendMessage",
  async ({ userId, message }: { userId: string; message: string },{dispatch}) => {
    dispatch(setMessages({ sender: "user", message }))

    const response = await sendMessage(userId, message);
    return response;
  }
);

const initialState = {
  messages: [] as Message[],
    loading: false,
    error: null as string | null,
    conversationId: null as string | null,
}

const chatSlice = createSlice({
  name: "chat",
    initialState,
    reducers:{
      setMessages: (state, action) => {
        state.messages.push(action.payload);
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
      setConversationId: (state, action) => {
        state.conversationId = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch messages";
      })
      .addCase(sendMessageAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessageAction.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          sender: "ai",
          message: action.payload,
        });
      })
      .addCase(sendMessageAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to send message";
      })
       
    },
});

export const {setMessages } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;