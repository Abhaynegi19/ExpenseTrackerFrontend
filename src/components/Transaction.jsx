import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import { addUserData } from "../utils/user";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RecentTransaction from "./RecentTransaction";

const Transaction = () => {
  const [transaction,setTransaction] = useState({
    type : "",
    title : "",
    amount : "",
    category : "",
    note : ""
  })
  const [showResent,setShowResent] = useState()
  const [isadd,setIsAdd] = useState(false)
  const [isShow,setIsShow] = useState(false)
  const userInfo = useSelector(store => store.userInfo)
  const dispatch = useDispatch()
  const nav = useNavigate()
  
  useEffect(() => {
      if(userInfo?.data?.username !== ""){
        return 
      }
      async function getUserData() {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/profile/`,
            {
              method: "GET",
              credentials: "include",
            }
          );
  
          const data = await res.json();
  
          if (data.success) {
            dispatch(addUserData(data.user));
          }
        } catch (err) {
          console.log(err);
        }
      }
  
      getUserData();
    }, []);

  async function addtrasnsaction(){
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/transactions/createTransaction",{
        method : "POST",
        headers : {
          "Content-type" : "application/json"
        },
        credentials : "include",
        body : JSON.stringify(transaction)
      })

      const data = await res.json()
      if(data.success){
        toast.success(data.message)
        nav("/dashboard")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex flex-col">
        <SidePanel />

        {/* Main Content */}
        <div className="flex gap-5 items-center p-8 mt-16 ml-30">
          <button
            onClick={() =>{
              setIsAdd(!isadd)
            }}
           className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg transition">add Transaction</button>
          
          <button
            onClick={() =>{
              setIsShow(!isShow)
            }}
           className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg transition">Show Resent Transactions</button>
          
        </div>
        <div className="flex-1 flex justify-center items-center p-8">
          {isadd && <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">

            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Add New Transaction
            </h1>

            <p className="text-gray-500 mb-8">
              Fill in the details below to add a new transaction.
            </p>

            <div className="space-y-5">

              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Transaction Type
                </label>

                <select
                  onChange={(e) =>{
                    setTransaction({
                      ...transaction,
                      type : e.target.value
                    })
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title
                </label>

                <input
                  onChange={(e) =>{
                    setTransaction({
                      ...transaction,
                      title : e.target.value
                    })
                  }}
                  type="text"
                  placeholder="Enter Title"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount
                </label>

                <input
                  onChange={(e) =>{
                    setTransaction({
                      ...transaction,
                      amount : e.target.value
                    })
                  }}
                  type="number"
                  placeholder="Enter Amount"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>

                <select
                  onChange={(e) =>{
                    setTransaction({
                      ...transaction,
                      category : e.target.value
                    })
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="Health">Health</option>
                  <option value="Salary">Salary</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Note
                </label>

                <textarea
                  onChange={(e) =>{
                    setTransaction({
                      ...transaction,
                      note : e.target.value
                    })
                  }}
                  rows="4"
                  placeholder="Write something..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              {/* Button */}
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-lg shadow-lg"
                  onClick={() =>{
                    addtrasnsaction()
                  }}
              >
                Add Transaction
              </button>

            </div>
          </div>}
        </div>
          {isShow && <div className="flex flex-col ml-30">
            <RecentTransaction />
          </div>}
      </div>
    </div>
  );
};

export default Transaction;