import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { addUserRecentTransaction, addUserTransaction } from "../utils/transaction";
import { addUserData } from "../utils/user";
import { useDispatch } from "react-redux";

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
  });

  async function getTransactionSummary() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/transactions/total`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
  
        if (data.success) {
          dispatch(
            addUserTransaction({
              totalIncome: data.totalIncome,
              totalExpense: data.totalExpense,
              balance: data.balance,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    }

  async function getUserData() {
        if(userInfo?.data?.username)  return 
        try {
          const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/profile/",{
            method : "GET",
            headers : {
              "Content-type" : "application/json"
            },
            credentials :"include"
          })
          const data = await res.json();
          if(data.user.isCompleted == false){
            nav("/setprofile")
          }
          if (data.success) {
            dispatch(addUserData(data.user));
          }
        } catch (err) {
          console.log(err);
        }
      }

  async function recentTransaction() {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/dashboard/recent",{
          method : "GET",
          headers : {
            "Content-type" : "application/json"
          },
          credentials : "include"
        })
        const data = await res.json()
        if(data.success){
          dispatch(addUserRecentTransaction(data?.transactions))
        }
      }

  async function login() {
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userInfo.email,
            username: userInfo.username,
            password: userInfo.password,
          }),
          credentials: "include",
        }
      );
      setUserInfo({
        username : "",
        email : "",
        password : ""
      })
      const data = await res.json();

      
      if (data.success) {
        await getUserData()
        await getTransactionSummary()
        await recentTransaction()
        
        toast.success(`Welcome ,${userInfo?.username || `User`} `)
        
        nav("/dashboard")
      }
      if(data?.info?.isCompleted == false){
        nav("/setProfile")
      }
    } catch (message) {
      toast.error(message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-2">
          Expense Tracker
        </h1>

        <div className="flex flex-col gap-6">
          {/* Email / Username */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="ip-email"
              className="text-sm font-semibold text-slate-700"
            >
              Email / Username
            </label>

            <input
              id="ip-email"
              type="text"
              value ={userInfo.email || userInfo.username}
              placeholder="Enter your email or username"
              className="h-12 w-full px-4 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              onChange={(e) => {
                if (validator.isEmail(e.target.value)) {
                  setUserInfo({
                    ...userInfo,
                    email: e.target.value,
                    username: "",
                  });
                } else {
                  setUserInfo({
                    ...userInfo,
                    username: e.target.value,
                    email: "",
                  });
                }
              }}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="ip-password"
              className="text-sm font-semibold text-slate-700"
            >
              Password
            </label>

            <input
              id="ip-password"
              type="password"
              value ={userInfo.password}
              placeholder="Enter your password"
              className="h-12 px-4 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  password: e.target.value,
                });
              }}
            />
          </div>

          <button
            className="bg-blue-600 text-white h-12 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200"
            onClick={login}
          >
            Login
          </button>
        </div>

        <p className="text-center text-slate-500 mt-6">
          New user?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 hover:underline transition"
            onClick={() => nav("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;