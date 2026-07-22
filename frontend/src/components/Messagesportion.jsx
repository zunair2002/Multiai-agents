import React, { useEffect, useState } from "react";
import { FiMic, FiArrowUp, FiGrid, FiStar } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { setMessagesData } from "../redux/messagesdataslice.js";
import { sendMessages } from "../features/AIapi/Sendmessages.js";
import { getMessages } from "../features/Getmessages.js";
import Navbar from "./Navbar.jsx";

const Messagesportion = () => {
  const [value, setvalue] = useState("");
  const dispatch = useDispatch();
  const activeChatFromRedux = useSelector(
    (state) => state.conversationData.selectedConversationData,
  );
   const UserDataFromRedux = useSelector(
      (state) => state.userData.user,
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

  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeChatFromRedux?._id) return;

      try {
        const data = await getMessages(activeChatFromRedux._id);
        console.log('useeffect sy data:',data)
        dispatch(setMessagesData(data.messages));
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, [activeChatFromRedux?._id, dispatch]);

  const handleSendMessage = async () => {
    if (!value.trim()) return;

    const payload = {
      prompt: value.trim(),
      conversationId: activeChatFromRedux?._id,
    };

    try {
      setvalue("");
      await sendMessages(payload);
      const data = await getMessages(activeChatFromRedux._id);
      dispatch(setMessagesData(data.messages));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex-1 h-screen bg-[#000000] flex flex-col overflow-hidden font-sans selection:bg-indigo-100">
      {activeChatFromRedux ? (
        <>
          <Navbar />
          <div className="flex-1 w-full flex flex-col overflow-hidden pt-2">
            <div className="flex-1 w-full max-w-3xl mx-auto overflow-y-auto px-6 custom-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
  {messagesData && messagesData.messages && messagesData.messages.length > 0 ? (
    <div className="space-y-6 py-6 flex flex-col">
      {messagesData.messages.map((message, index) => (
        <div
  key={index}
  className={`flex ${
    message.role === "user"
      ? "justify-end"
      : "justify-start"
  }`}
>
  <div className="max-w-[85%] flex flex-col">
    <div
      className={`text-[14px] leading-relaxed ${
        message.role === "user"
          ? "text-white"
          : "text-gray-200"
      }`}
    >
      {message.content}
    </div>

    <span
      className={`text-[9px] text-gray-500 mt-1 ${
        message.role === "user"
          ? "text-right"
          : "text-left"
      }`}
    >
      {new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </span>
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
              <div className="w-full bg-[#080808] rounded-2xl border border-white/5 p-2 flex items-center gap-2">
                <button className="p-2.5 rounded-xl hover:bg-white/5">
                  <FiMic className="text-gray-500" />
                </button>

                <input
                  type="text"
                  placeholder="Message MultiAgents..."
                  value={value}
                  onChange={(e) => setvalue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-500"
                />

                <button
                  disabled={!value.trim()}
                  onClick={handleSendMessage}
                  className={`p-2.5 rounded-xl transition-colors ${
                    value.trim() ? "bg-white hover:bg-gray-200" : "bg-gray-500 cursor-not-allowed"
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
                  <FiStar className="absolute -top-1 -right-4 rotate-12 text-[#8917d5]" size={16} />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7C3AED] via-[#8917d5] to-[#5B6CFF]">
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
                  className="px-4 py-1.5 rounded-full text-[11px] font-medium border bg-[#1A1A1A] border-white/5 text-gray-400 hover:border-white/20 hover:text-white transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-3xl md:text-5xl font-bold text-[#262626]">Ready when you are.</h2>
          </div>

          <div className="w-full max-w-2xl flex flex-col items-center mb-6">
            <div className="flex items-center gap-1.5 bg-[#262626] p-1.5 rounded-full border border-white/5">
              {bottomTabs.map((tab, i) => (
                <button
                  key={i}
                  className={`px-4 py-1 rounded-full text-[11px] font-medium transition-all ${
                    i === 0 ? "bg-white text-black" : "text-gray-400 hover:text-white"
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