import React, { useEffect, useState } from "react";
import {
  FiMic,
  FiArrowUp,
  FiGrid,
  FiStar,
  FiPlus,
  FiGlobe,
  FiImage,
  FiMessageSquare,
  FiFileText,
  FiZap,
  FiCopy,
FiVolume2,
FiThumbsUp,
FiThumbsDown,
FiRefreshCw,

} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  setMessagesData,
  addMessagesData,
} from "../redux/messagesdataslice.js";
import { sendMessages } from "../features/AIapi/Sendmessages.js";
import { getMessages } from "../features/Getmessages.js";
import { updateConversationTitle } from "../features/UpdateConverationTitle.js";
import { updatetitle } from "../redux/conversationsdataslice.js";
import { MarkdownResponse } from "./MarkdownResponse.jsx";
import Navbar from "./Navbar.jsx";

const Messagesportion = () => {
  const [value, setvalue] = useState("");
  const [titleSet, setTitleSet] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [selectedTool, setSelectedTool] = useState({
  agentKey: "auto"
    });  
  const dispatch = useDispatch();
  const activeChatFromRedux = useSelector(
    (state) => state.conversationData.selectedConversationData,
  );
  const messagesData = useSelector((state) => state.messagesData.messagesData);

  const categories = [
    "Searching",
    "General",
    "Brainstorming",
    "Summarize PDF",
    "Trending",
    "Internet search",
    "Latest news",
  ];
  const bottomTabs = ["Research", "PDF", "General"];
  const menuItems = [
    {
      title: "Auto",
      agentKey: "auto",
      description: "Automatically choose the best tool",
      icon: FiZap,
    },
    {
      title: "Chat Agent",
      agentKey: "chat",
      description: "Ask your AI assistant anything",
      icon: FiMessageSquare,
    },
    {
      title: "PDF Chat",
      agentKey: "pdf",
      description: "Chat with your PDF documents",
      icon: FiFileText,
    },
    {
      title: "Web Search",
      agentKey: "search",
      description: "Search real-time information",
      icon: FiGlobe,
    },
  ];

  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeChatFromRedux?._id) {
        dispatch(setMessagesData({ messages: [] }));
        return;
      }

      try {
        dispatch(setMessagesData({ messages: [] }));
        const data = await getMessages(activeChatFromRedux._id);
        dispatch(setMessagesData(data));
      } catch (err) {
        console.log(err);
        dispatch(setMessagesData({ messages: [] }));
      }
    };

    fetchMessages();
  }, [activeChatFromRedux?._id, dispatch]);

  const handleSendMessage = async () => {
    const chatId = activeChatFromRedux?._id || activeChatFromRedux?.id;
    if (!chatId) {
      console.error("Conversation ID not found. Please wait or refresh.");
      return;
    }
    if (!value.trim()) return;

    const promptText = value.trim();
    const userMessage = {
      role: "user",
      content: promptText,
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessagesData(userMessage));
    setvalue("");

    if (
      (!activeChatFromRedux?.title ||
        activeChatFromRedux?.title === "New Chat") &&
      !titleSet[chatId]
    ) {
      const generatedTitle =
        promptText.length > 30
          ? promptText.substring(0, 30) + "..."
          : promptText;

      updateConversationTitle({ id: chatId, title: generatedTitle });
      dispatch(updatetitle({ conversationId: chatId, title: generatedTitle }));
      setTitleSet((prev) => ({ ...prev, [chatId]: true }));
    }

    const payload = {
      prompt: promptText,
      conversationId: chatId,
      agentkey: selectedTool.agentKey.toLowerCase() || 'auto',
    };

    try {
      const response = await sendMessages(payload);
      console.log("sendMessages Response:", response);

      const data = await getMessages(chatId);

      console.log("getMessages:", data);
      dispatch(setMessagesData(data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex-1 h-screen bg-[#20201F] flex flex-col overflow-hidden font-sans selection:bg-indigo-100">
      {activeChatFromRedux ? (
        <>
          <Navbar />
          <div className="flex-1 w-full flex flex-col overflow-hidden pt-2">
            <div className="flex-1 w-full max-w-3xl mx-auto overflow-y-auto px-6 custom-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {messagesData &&
              messagesData.messages &&
              messagesData.messages.length > 0 ? (
                <div className="space-y-8 py-6 flex flex-col">
                  {messagesData.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex w-full ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div className={`max-w-[85%] flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}>
                        <div
                          className={`text-[14px] leading-relaxed px-4 py-2 rounded-2xl ${
                            message.role === "user"
                              ? "text-white bg-[#262626]"
                              : "text-gray-200 bg-transparent !px-0"
                          }`}
                        >
                          {message.fileUrl ? (
                            <div className="flex items-center gap-3 bg-[#1A1A1A] border border-white/10 rounded-xl p-3 max-w-[260px]">
                              <FiFileText className="text-red-400" size={22} />
                              <div className="flex-1 overflow-hidden">
                                <p className="text-xs text-white truncate">
                                  {message.fileName || "document.pdf"}
                                </p>
                                <p className="text-[10px] text-white/40">
                                  PDF Document
                                </p>
                              </div>
                               <a
                                href={message.fileUrl}
                                download={message.fileName}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 shrink-0"
                              >
                                <FiArrowUp
                                  className="rotate-180 text-white"
                                  size={14}
                                />
                              </a>
                            </div>
                          ) : (
                            <MarkdownResponse content={message.content} />
                          )}
                        </div>

                        {message.role === "user" ? (
                           <span className="text-[9px] text-gray-500 mt-1">
                           {new Date(message.createdAt).toLocaleTimeString([], {
                             hour: "2-digit",
                             minute: "2-digit",
                           })}
                         </span>
                        ) : (
                          <div className="flex items-center gap-3 mt-2 text-gray-500">
                            <button className="hover:text-white transition-colors cursor-pointer"><FiCopy size={12}/></button>
                            <button className="hover:text-white transition-colors cursor-pointer"><FiVolume2 size={12}/></button>
                            <button className="hover:text-white transition-colors cursor-pointer"><FiRefreshCw size={12}/></button>
                            <button className="hover:text-white transition-colors cursor-pointer"><FiThumbsUp size={12}/></button>
                            <button className="hover:text-white transition-colors cursor-pointer"><FiThumbsDown size={12}/></button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-white/40 text-sm">
                    Start a new conversation...
                  </p>
                </div>
              )}
            </div>

            <div className="w-full max-w-3xl mx-auto px-6 pb-5">
              <div className="relative w-full bg-[#272726] rounded-2xl border border-white/5 p-2 flex items-center gap-2">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2.5 rounded-xl hover:bg-white/5 transition cursor-pointer"
                >
                  <FiPlus className="text-white" />
                </button>

                {showMenu && (
                  <div className="absolute bottom-16 left-0 w-72 overflow-hidden rounded-2xl border border-white/2 bg-[#262626] backdrop-blur-xl shadow-3xl z-50">
                    {menuItems.map((item, index) => (
                      <div key={index}>
                        <button
                          onClick={() => {
                            setSelectedTool({
                              title: item.title,
                              agentKey: item.agentKey,
                            });
                            setShowMenu(false);
                          }}
                          className={`group flex w-full items-center gap-4 px-4 py-3 transition cursor-pointer ${
                            selectedTool.title === item.title
                              ? "bg-[#3b3a3a]"
                              : "hover:bg-[#3b3a3a]"
                          }`}
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                            <item.icon className="text-lg text-white" />
                          </div>

                          <div className="text-left">
                            <p className="text-xs font-medium text-white">
                              {item.title}
                            </p>
                            <p className="text-[10px] text-white/45">
                              {item.description}
                            </p>
                          </div>
                        </button>

                        {index !== menuItems.length - 1 && (
                          <div className="border-t border-white/10" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <input
                  type="text"
                  placeholder="Message MultiAgents..."
                  value={value}
                  onChange={(e) => setvalue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-500"
                />

                <button className="p-2.5 rounded-xl hover:bg-white/5">
                  <FiMic className="text-white" />
                </button>

                <button
                  disabled={!value.trim()}
                  onClick={handleSendMessage}
                  className={`p-2.5 rounded-xl transition-colors ${
                    value.trim()
                      ? "bg-white hover:bg-gray-200"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FiArrowUp className="text-black" />
                </button>
              </div>

              <p className="text-center text-[10px] text-white/40 mt-2">
                AI may display inaccurate info, so double-check its responses.
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-between p-6">
          <div className="w-full max-w-3xl flex flex-col items-center mt-8 space-y-6">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Enhance your{" "}
                <span className="relative inline-block">
                  <FiStar
                    className="absolute -top-1 -right-4 rotate-12 text-[#D97757]"
                    size={16}
                  />
                  <span className="bg-clip-text text-white">
                    Productivity
                  </span>
                </span>{" "}
                with AI
              </h1>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  className="px-4 py-1.5 rounded-md text-[11px] font-medium bg-[#262626] text-white hover:bg-[#4b4b4b] hover:text-white transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-2xl md:text-4xl font-bold text-[#d97857]">
              Ready when you are.
            </h2>
          </div>

          <div className="w-full max-w-2xl flex flex-col items-center mb-6">
            <div className="flex items-center gap-1.5 bg-[#262626] p-1.5 rounded-full border shadow-lg border-white/5">
              {bottomTabs.map((tab, i) => (
                <button
                  key={i}
                  className={`px-4 py-1 rounded-full text-[11px] font-medium transition-all ${
                    i === 0
                      ? "bg-[#d97857] text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}

              <div className="h-4 w-[1px] bg-white/10 mx-1"></div>
              <button className="flex items-center gap-1.5 px-3 py-1 text-[11px] text-gray-400 hover:text-white">
                <FiGrid size={12} />
                More
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messagesportion;
