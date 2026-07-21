import {
  FiChevronDown,
  FiUpload,
  FiMoreHorizontal,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const Navbar = () => {
  return (
   <nav className="h-14 w-full bg-transparent text-white px-5 flex items-center justify-between">
  <div className="flex items-center gap-1 cursor-pointer">
    <h1 className="text-md font-semibold">MultiAgents</h1>
    <FiChevronDown className="text-base text-sm mt-1" />
  </div>

  <div className="flex items-center gap-5">
    <button className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition">
      <HiSparkles className="text-base" />
      <span className="text-sm font-medium">Upgrade</span>
    </button>

    <button className="hover:text-gray-300 transition">
      <FiUpload className="text-lg" />
    </button>

    <button className="text-sm font-medium hover:text-gray-300 transition">
      Share
    </button>

    <button className="hover:text-gray-300 transition">
      <FiMoreHorizontal className="text-lg" />
    </button>
  </div>
</nav>
  );
};

export default Navbar;