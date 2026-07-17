import React, { useEffect, useState } from "react";
import { getConversation } from '../features/Getconversations.js'
import { createConversation } from '../features/Createconversations.js'
import { useDispatch, useSelector } from 'react-redux'
import { setConversationData, addConversationData } from '../redux/conversationsdataslice.js'

import {
  FiSearch,
  FiGrid,
  FiUsers,
  FiSettings,
  FiHelpCircle,
  FiMessageCircle,
  FiPlus,
} from "react-icons/fi";

const Sidebar = () => {
  const dispatch = useDispatch();
  const conversationData = useSelector((state) => state.conversationData.conversationData);
  const [activeConversation, setActiveConversation] = useState(null);

  useEffect(() => {
    const getConversationData = async() => {
      const data = await getConversation()
      if (data) {
        dispatch(setConversationData(data));
      }
      console.log("Fetched conversations:", data);
    }
    getConversationData()
  }, [dispatch])

  const handleCreateConversation = async () => {
    const newConversation = await createConversation();
    if (newConversation) {
      dispatch(addConversationData(newConversation));
      setActiveConversation(newConversation);
      console.log("New conversation created and added to Redux:", newConversation);
    }
  }

  const handleConversationClick = (conversation) => {
    setActiveConversation(conversation);
    console.log("Selected conversation:", conversation);
  }

  const mainMenuItems = [
    { name: "Dashboard", icon: <FiGrid />, active: true },
    { name: "Customers", icon: <FiUsers />, active: false },
  ];

  return (
    <div className="flex h-screen w-full bg-white font-sans antialiased overflow-hidden">
      <aside className="w-full h-full bg-[#18181b] flex flex-col border-r border-white/5">
        {/* Header */}
        <div className="p-4">
          <div className="flex items-center justify-between p-2 rounded-xl transition-all duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg">
                <img
                  src="/ailogo.png"
                  alt="MultiAgents Logo"
                  className="h-25 w-30 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-medium text-[15px] leading-tight">
                  MultiAgents
                </span>
                <span className="text-gray-500 text-xs">Workspace</span>
              </div>
            </div>
            <button 
              className="p-1 rounded-full hover:bg-white/10 cursor-pointer transition-all duration-200" 
              onClick={handleCreateConversation}
            >
              <FiPlus className="text-gray-500 text-lg" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 mb-4">
          <div className="relative group">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg group-focus-within:text-white transition-colors" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#1A1A1A] text-sm text-gray-300 pl-10 pr-12 py-2 rounded-lg border border-white/5 focus:border-white/20 outline-none transition-all placeholder:text-gray-600"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-[#262626] px-1.5 py-0.5 rounded border border-white/10">
              <span className="text-[10px] text-gray-500 font-mono">⌘</span>
              <span className="text-[10px] text-gray-500 font-mono">K</span>
            </div>
          </div>
        </div>

        {/* Navigation Area */}
        <div className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar">
          {mainMenuItems.map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                item.active
                  ? "bg-[#262626] text-white shadow-sm"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className={`text-lg transition-colors ${item.active ? "text-white" : "text-gray-500 group-hover:text-white"}`}>
                {item.icon}
              </span>
              <span className="text-[14px] font-medium">{item.name}</span>
            </button>
          ))}

<div className="border-t border-white/5 -mx-3 mb-3"></div>

<div className="flex items-center gap-3 px-3 py-2">
  <FiMessageCircle className="text-lg text-gray-500" />
  <span className="text-[14px] font-medium text-gray-400">
    Recent Chats
  </span>
</div>
          
          {conversationData?.length > 0 ? (
            conversationData.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => handleConversationClick(conversation)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${activeConversation?.id === conversation.id ? "bg-[#262626] text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xs font-medium">
                  {conversation.userName ? conversation.userName.charAt(0).toUpperCase() : '?'}
                </div>
                <div className="flex flex-col items-start flex-1 overflow-hidden">
                  <span className="text-[13px] font-medium truncate">{conversation.title || conversation.userName || 'Unknown Chat'}</span>
                  <span className="text-[11px] text-gray-500 truncate">{conversation.lastMessage || 'No messages yet'}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-[12px] text-gray-500">No recent conversations</div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/5 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200 group">
            <FiSettings className="text-lg text-gray-500 group-hover:text-white" />
            <span className="text-[14px] font-medium">Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200 group">
            <FiHelpCircle className="text-lg text-gray-500 group-hover:text-white" />
            <span className="text-[14px] font-medium">Help & Support</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;