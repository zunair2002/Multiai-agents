import axios from 'axios';
import api from '../utils/axiosconfig';

export const createConversation = async() => {
try{
    const {data} = await api.get("/api/chat/createconversation")
    console.log('createConversation data:',data)
    return data
}
catch(err){
    console.log('createConversation error',err)
}
}
