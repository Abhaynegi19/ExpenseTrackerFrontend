import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userInfo = useSelector((store) => store.userInfo);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-8">

      {/* Left */}
      <div className="flex items-center gap-10">

        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-indigo-600">
            💰 Expense Tracker
          </h1>
        </div>

        {/* Greeting */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Hi, {userInfo?.name || "User"} 👋
          </h2>

          <p className="text-sm text-gray-500">
            Manage your finances smarter.
          </p>
        </div>

      </div>

      {/* Center */}
      <div className="hidden lg:flex w-1/3">
        <input
          type="text"
          placeholder="🔍 Search transactions..."
          className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <button className="relative h-11 w-11 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-xl">
          🔔
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">

          <img
            src={
              userInfo?.displayPicture ||
              "https://ui-avatars.com/api/?name=User&background=6366f1&color=fff"
            }
            alt="Profile"
            className="h-12 w-12 rounded-full border-2 border-indigo-500 object-cover"
          />

          <div className="hidden md:block">
            <h3 className="font-semibold text-gray-800">
              {userInfo?.username || "Username"}
            </h3>

            <p className="text-sm text-gray-500">
              Welcome Back
            </p>
          </div>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;