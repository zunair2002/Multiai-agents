import React from "react";
import { FiPlus, FiMic, FiArrowUp, FiGrid, FiStar } from "react-icons/fi";

const ChatGPTMain = () => {
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

  return (
    <div className="flex-1 h-screen bg-[#18181B] flex flex-col items-center justify-between p-6 overflow-hidden font-sans selection:bg-indigo-100">
      {/* Top Section */}
      <div className="w-full max-w-3xl flex flex-col items-center mt-8 space-y-6">
        {/* Main Heading with Gradient */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Enhance your{" "}
            <span className="relative inline-block">
              <FiStar
                className="absolute -top-1 -right-3 rotate-12 text-[#8917d5] opacity-80"
                size={14}
              />

              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7C3AED] via-[#8917d5] to-[#5B6CFF]">
                Productivity
              </span>
            </span>{" "}
            with AI
          </h1>
        </div>

        {/* Categories Pills - Enhanced Hover */}
        <div className="flex flex-wrap justify-center gap-2 px-4">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`px-4 py-1.5 rounded-full text-[10px] font-semibold transition-all duration-300 border ${
                i === 0
                  ? "bg-[#262626] border-[#7070714a] text-white hover:border-[#c3c3c469] cursor-pointer"
                  : "bg-[#1A1A1A] border-[#7070714a] text-gray-500 hover:border-[#c3c3c469] cursor-pointer"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Middle Section: Center Piece */}
      <div className="flex-1 flex items-center justify-center">
        <h2 className="text-2xl md:text-4xl font-bold text-[#2f2f30]">
          Ready when <span className="text-[#2f2f30]">you are</span>
          <span className="text-[#2f2f30]">.</span>
        </h2>
      </div>

      {/* Bottom Section: Compact & Fancy Input */}
      <div className="w-full max-w-2xl flex flex-col items-center mb-2">
        <div className="w-full max-w-2xl flex flex-col items-center mb-2">
          <div className="flex items-center gap-1.5 mb-2 bg-[#262626] p-2 rounded-full">
            {bottomTabs.map((tab, i) => (
              <button
                key={i}
                className={`px-2 py-0.5 rounded-full text-[10px] font-medium cursor-pointer transition-all duration-300 ${i === 0 ? "bg-white shadow-sm text-[#2f2f30]" : "text-gray-500"}`}
              >
                {tab}
              </button>
            ))}
            <div className="h-3 w-[1px] bg-gray-200 mx-1"></div>
            <button className="flex items-center gap-1 text-[10px] text-gray-500">
              <FiGrid size={12} /> More
            </button>
          </div>
        </div>

        {/* Input Bar: Glass-like finish */}
        <div
          className="w-full relative flex items-center bg-[#262626] border border-[#7070714a] rounded-2xl shadow-sm px-3 py-2.5
                transition-all duration-300 ease-in-out
                hover:border-[#61616180]
                focus-within:border-[#61616180]
                focus-within:shadow-md
                group"
        >
          <input
            type="text"
            placeholder="Ask anything..."
            className="w-full bg-transparent outline-none text-gray-500 text-xs pl-1"
          />
          <div className="flex items-center gap-2 text-gray-400">
            <FiPlus className="cursor-pointer hover:text-gray-600 size-4" />
            <FiMic className="cursor-pointer hover:text-gray-600 size-4" />
            <button className="bg-[#2f2f30] p-1 rounded-full text-white group-focus-within:bg-gray-100 group-focus-within:text-gray-500 transition">
              <FiArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <p className="text-[10px] font-medium text-gray-400 mt-1">
        By using, you agree to our{" "}
        <span className="text-gray-500 underline decoration-gray-200 cursor-pointer hover:text-indigo-500 transition-colors">
          Terms
        </span>{" "}
        &{" "}
        <span className="text-gray-500 underline decoration-gray-200 cursor-pointer hover:text-indigo-500 transition-colors">
          Privacy
        </span>
      </p>
    </div>
  );
};

export default ChatGPTMain;
