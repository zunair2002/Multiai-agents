import React, { useEffect, useState } from "react";
import { getConversation } from "../features/Getconversations.js";
import { createConversation } from "../features/Createconversations.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setConversationData,
  addConversationData,
  selectedConversationData as setSelectedAction,
} from "../redux/conversationsdataslice.js";
import { Logout } from "../features/Logout.js";
import { setUser } from "../redux/userdatasclice.js";
import { useNavigate } from 'react-router-dom';


import {
  FiSearch,
  FiGrid,
  FiUsers,
  FiSettings,
  FiHelpCircle,
    FiMessageCircle, 
  FiChevronDown, 
  FiUser,
  FiMoreVertical,
  FiLogOut,
  FiEdit 
} from "react-icons/fi";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const conversationData = useSelector(
    (state) => state.conversationData.conversationData,
  );
  const activeChatFromRedux = useSelector(
    (state) => state.conversationData.selectedConversationData,
  );
  const UserDataFromRedux = useSelector(
    (state) => state.userData.user,
  );

  const [showChats, setShowChats] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const getConversationData = async () => {
      const data = await getConversation();
      if (data) {
        dispatch(setConversationData(data.conversation));
      }
    };
    getConversationData();
  }, [dispatch]);

  const handleCreateConversation = async () => {
    const newConversation = await createConversation();
    if (newConversation) {
      dispatch(addConversationData(newConversation));
      dispatch(setSelectedAction(newConversation));
    }
  };

   const handleConversationClick = (conversation) => {
    dispatch(setSelectedAction(conversation));
  };
  
  const handleLogout = async () => {
  const success = await Logout();

  if (success) {
    dispatch(setUser(null));
    navigate("/login", { replace: true });
  }
};

  const mainMenuItems = [
    { name: "Dashboard", icon: <FiGrid />, active: true },
    { name: "Customers", icon: <FiUsers />, active: false },
  ];

  return (
   <div className="flex h-screen w-full bg-white font-sans antialiased overflow-hidden">
  <aside className="w-full h-full bg-[#18181b] flex flex-col border-r border-white/5">
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 flex items-center justify-center">
          <img
            src="/ailogo.png"
            alt="Logo"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-1 text-white hover:text-white transition-colors">
          <FiSearch size={18} />
        </button>
        <button className="p-1 text-white hover:text-white transition-colors">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
            <line x1="9" x2="9" y1="3" y2="21"></line>
          </svg>
        </button>
      </div>
    </div>

    <div className="px-3 mb-2">
      <button
  onClick={handleCreateConversation}
  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#262626] transition-all duration-200 group"
>
  <FiEdit className="text-white group-hover:text-white text-lg" />

  <span className="text-[14px] font-medium">
    New chat
  </span>
</button>
    </div>

    <div className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {mainMenuItems.map((item) => (
        <button
          key={item.name}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
            item.active
              ? "text-white hover:bg-white/5 hover:text-white"
              : "text-white hover:bg-white/5 hover:text-white"
          }`}
        >
          <span className={`text-lg transition-colors ${item.active ? "text-white" : "text-white"}`}>
            {item.icon}
          </span>
          <span className="text-[14px] font-medium">{item.name}</span>
        </button>
      ))}

      <div className="border-t border-white/5 -mx-3 mb-3"></div>

      <div className="w-full">
        <button
          onClick={() => setShowChats(!showChats)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-white hover:bg-[#262626] transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <span className="text-[14px] font-medium">Recent Chats</span>
          </div>
          <FiChevronDown className={`text-white transition-transform duration-300 ${showChats ? "rotate-180" : ""}`} />
        </button>

        <div className={`grid transition-all duration-300 ease-in-out ${showChats ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden space-y-1">
            {conversationData?.length > 0 ? (
              conversationData.map((conversation, index) => {
                const isActive = activeChatFromRedux?.id === conversation.id;
                return (
                  <button
                    key={conversation.id || index}
                    onClick={() => handleConversationClick(conversation)}
                    className={`w-full rounded-lg px-3 py-2 text-left transition-all duration-200 ${
                      isActive ? "bg-transparent hover:bg-white/5 hover:text-white font-medium text-white" : "text-white/70 hover:bg-white/5 hover:text-white font-medium"
                    }`}
                  >
                    <p className="text-xs truncate">
                      {conversation.title || conversation.name || "New Chat"}
                    </p>
                  </button>
                );
              })
            ) : (
              <p className="px-3 py-2 text-[11px] font-medium text-white/50">No recent chats</p>
            )}
          </div>
        </div>
      </div>
    </div>

    <div className="p-3 border-t border-white/5 space-y-2">
      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-white/5 transition-all duration-200 group">
        <FiSettings className="text-lg text-white" />
        <span className="text-[13px] font-medium">Settings</span>
      </button>

      <div className="relative">
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 transition-all duration-200">
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative">
              {UserDataFromRedux?.avatar ? (
                <img
                  src={UserDataFromRedux.avatar}
                  alt="Profile"
                  className="w-5 h-5 rounded-full object-cover border border-white/10"
                />
              ) : (
                <div className="w-5 h-5 rounded-lg bg-zinc-800 flex items-center justify-center border border-white/10">
                  <FiUser className="text-white text-[12px]" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex flex-col gap-1">
              <p className="text-[10px] text-white font-medium leading-none">
                {UserDataFromRedux?.name || UserDataFromRedux?.fullName || "User"}
              </p>
              <span className="inline-flex text-[8px] text-gray-500 font-medium leading-none">
                Free
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className={`p-1.5 rounded-lg transition-colors ${showMenu ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <FiMoreVertical className="text-sm" />
            </button>
          </div>
        </div>

        {showMenu && (
          <div className="absolute bottom-full left-0 right-0 mb-2 p-1 rounded-xl border border-white/10 bg-[#1f1f1f] shadow-2xl z-50 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-[12px] text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-150 group"
            >
              <FiLogOut className="text-sm transition-transform group-hover:translate-x-0.5" />
              <span className="font-medium">Log out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  </aside>
</div>
  );
};

export default Sidebar;