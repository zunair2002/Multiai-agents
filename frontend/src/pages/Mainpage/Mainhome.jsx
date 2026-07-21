import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ChatGPTMain from '../../components/Messagesportion.jsx'
import { getMessages } from "../../features/Getmessages.js";
import { setMessagesData } from '../../redux/messagesdataslice.js'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

function Mainhome() {
const dispatch = useDispatch();
const activeChatFromRedux = useSelector(
  (state) => state.conversationData.selectedConversationData
);
  useEffect(() => {
    const getAllMessages = async () => {
      if (!activeChatFromRedux?._id) return;
  
      const data = await getMessages(activeChatFromRedux._id);
      dispatch(setMessagesData(data));
    };
  
    getAllMessages();
  }, [activeChatFromRedux, dispatch]);

  return (
    <>
    <div style={{ display: 'flex' }}>
      <div style={{ width: '25%' }}>
        <Sidebar />
      </div>
      <div style={{ width: '75%' }}>
        <ChatGPTMain />
      </div>
    </div>
          </>
  )
}

export default Mainhome
