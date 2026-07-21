import axios from 'axios';
import api from '../../utils/axiosconfig.js';

export const sendMessages = async(payload) => {
try{
    const {data} = await api.post("/api/agent/chat",payload)
    return data
}
catch(err){
    console.log('sendMessage error',err)
     throw err;
}
}
