import axios from 'axios';
import api from '../utils/axiosconfig';

export const getConversation = async() => {
try{
    const {data} = await api.get("/api/chat/getconversation/:conversationId")
    console.log(data)
    return data
}
catch(err){
    console.log('getConversation error',err)
}
}
