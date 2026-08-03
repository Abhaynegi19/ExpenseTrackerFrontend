import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  IndianRupee,
  FolderKanban,
  Target,
  User,
  LogOut,
  HandCoins,
} from "lucide-react";
import toast from "react-hot-toast";

const SidePanel = () => {
  const [expand, setExpand] = useState(false);
  const nav = useNavigate()

  async function Logout() {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/auth/logout",{
      method : "GET",
      headers : {
        "Content-type" : "application/json"
      },
      credentials : "include"
    })
    const data = await res.json()
    if(data.success){
      toast.success(data.message)
      nav("/login")
    }
  }

  const menus = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={22} />,
    },
    {
      title: "Transactions",
      path: "/transactions",
      icon: <Wallet size={22} />,
    },
    {
      title : "Expense",
      path : "/expense",
      icon : <HandCoins size={22} />
    },
    {
      title: "Income",
      path: "/income",
      icon: <IndianRupee size={22} />,
    },
    {
      title: "Categories",
      path: "/category",
      icon: <FolderKanban size={22} />,
    },
    {
      title: "Budgets",
      path: "/budget",
      icon: <Target size={22} />,
    },
    {
      title: "Profile",
      path: "/profile",
      icon: <User size={22} />,
    },
  ];

  return (
    <aside
      onMouseEnter={() => setExpand(true)}
      onMouseLeave={() => setExpand(false)}
      className={`fixed top-20 left-0 h-[calc(100vh-5rem)]
      bg-white border-r border-gray-200 shadow-sm
      transition-all duration-300 ease-in-out
      ${expand ? "w-45" : "w-20"}
      flex flex-col`}
    >
      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-2">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
              ${
                isActive
                  ? "bg-indigo-100 text-indigo-600 font-semibold shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
              }`
            }
          >
            <span>{menu.icon}</span>

            {expand && (
              <span className="text-[15px]">
                {menu.title}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div
        onClick={() =>{
          Logout()
        }}
        className="border-t border-gray-200 p-3">
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200">
          <LogOut size={22} />

          {expand && (
            <span className="font-medium">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default SidePanel;