import axios from 'axios';
import api from '../utils/axiosconfig';

export const updateConversationTitle = async(payload) => {
    try{
        const {data} = await api.post("/api/chat/updatessage", payload)
        return data
    }
    catch(err){
        console.log('update title error',err)
        return null
    }
}
