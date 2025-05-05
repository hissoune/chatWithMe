import apiClient from "./client";



export const getAllMessages = async (userId: string) => {
  try {
    const response = await apiClient.get(`/ai/${userId}`);
    console.log("Fetched messages:", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
}

export const sendMessage = async (userId: string, message: string) => {
  try {
    const response = await apiClient.post(`/ai/ask/${userId}`, { message });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}