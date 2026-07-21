import api from "../utils/axiosconfig.js";

export const getMessages = async (conversationId) => {
  try {
    const { data } = await api.get(`/api/chat/getmessage/${conversationId}`);
    console.log('getMessages data:',data)
    return data;
  } catch (error) {
    console.log("getMessages error", error);
    return [];
  }
};