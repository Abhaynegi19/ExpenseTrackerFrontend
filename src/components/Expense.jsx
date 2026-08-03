import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import { useDispatch, useSelector } from "react-redux";
import { addUserExpenses } from "../utils/transaction";
import toast from "react-hot-toast";

const Expense = () => {
    const dispatch = useDispatch()
    const userExpenseData = useSelector(store => store.userTransaction.allExpenses)
    const totalexpense = useSelector(store => store.userTransaction.totalExpense)
    const [page,setPage] = useState(1)
    const limit = 5
    const [isEditing,setIsEditing] = useState(false)
    
    const [updatedExpense, setUpdatedExpense] = useState({
        _id: "",
        title: "",
        amount: "",
        category: "",
        note: "",
    });

    async function AllTransactions() {
            const res = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/transactions/getAllExpense?page=${page}&limit=${limit}`,{
                method : "GET",
                headers :{
                    "Content-type" : "application/json"
                },
                credentials : "include"
            })
            const data = await res.json()
            if(data.success){
                const expenseData = {
                    expenses : data.expense,
                    page : data.page,
                    totalexpenses : data.totalexpenses,
                    totalpages : data.totalpages
                }
                dispatch(addUserExpenses(expenseData))
            }
        }
    useEffect(() =>{
    
        AllTransactions()
    },[page])

    async function updateTransaction() {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/transactions/${updatedExpense._id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(updatedExpense),
        }
    );

    const data = await res.json();

    if (data.success) {
        toast.success(data.message);
        await AllTransactions()
    } else {
        toast.error("Updation failed");
    }
    }

    async function deleteExpense(id){
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/transactions/${id}`,{
            method : "DELETE",
            headers : {
                "Content-type" : "application/json"
            },
            credentials : "include"
        })
        const data = await res.json()
        if(data.success){
            toast.success(data.message)
            await AllTransactions()
        }
    }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <SidePanel />

        {/* Main Content */}
        <div className="flex-1 ml-52 mt-20 p-6">
          <div className="bg-white rounded-xl shadow-lg p-6">

            {/* Header */}
            <div className="flex justify-between items-center border-b pb-5">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Expense Overview
                </h1>
                <p className="text-gray-500 mt-1">
                  Manage all your expenses in one place.
                </p>
              </div>

              <div className="bg-red-100 px-6 py-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Expense</p>
                <h2 className="text-3xl font-bold text-red-600">
                  ₹{totalexpense}
                </h2>
              </div>
            </div>

            {/* Expense List */}
            <div className="mt-8 space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">
                    Recent Expense
                </h1>

              {/* Expense Card */}
              {
              !isEditing ? userExpenseData?.expenses?.length > 0 ? 
              userExpenseData.expenses.map((item,index) =>{
                return (
                    <div key={index} className="bg-gray-50 border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition">

                    <div>
                        <h2 className="font-semibold text-lg">{item.title}</h2>
                        <p className="text-gray-500 text-sm">
                            {item.category} • {item.date.slice(0,10)}
                        </p>
                    </div>

                    <div className="text-right">
                    <p className="text-red-600 font-bold text-xl">
                        -₹{item.amount}
                    </p>

                    <div className="mt-2 space-x-2">
                        <button
                            onClick={() => {
                                setUpdatedExpense({
                                    _id: item._id,
                                    title: item.title,
                                    amount: item.amount,
                                    category: item.category,
                                    note: item.note,
                                });

                                setIsEditing(true);
                            }}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() =>{
                                deleteExpense(item._id)
                            }}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                            Delete
                        </button>
                    </div>
                    </div>
                </div>
                )
              }) 
              : "No expense added yet"
              :
                <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-6">

                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Edit Expense
                </h2>

                <div className="flex flex-col gap-4">

                    <input
                        value={updatedExpense.title}
                        onChange={(e) =>
                            setUpdatedExpense({
                                ...updatedExpense,
                                title: e.target.value,
                            })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                        placeholder="Enter title"
                        type="text"
                    />

                    <input
                        value={updatedExpense.amount}
                        onChange={(e) =>
                            setUpdatedExpense({
                                ...updatedExpense,
                                amount: e.target.value,
                            })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                        placeholder="Enter amount"
                        type="number"
                    />

                    <input
                        value={updatedExpense.category}
                        onChange={(e) =>
                            setUpdatedExpense({
                                ...updatedExpense,
                                category: e.target.value,
                            })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                        placeholder="Enter category"
                        type="text"
                    />

                    <input
                        value={updatedExpense.note}
                        onChange={(e) =>
                            setUpdatedExpense({
                                ...updatedExpense,
                                note: e.target.value,
                            })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                        placeholder="Enter note"
                        type="text"
                    />

                    <div className="flex justify-end gap-3">

                        <button
                            onClick={() => {
                                updateTransaction();
                                setIsEditing(false);
                            }}
                            className="px-5 py-2 rounded-lg bg-green-600 text-white"
                        >
                            Save
                        </button>

                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-5 py-2 rounded-lg bg-red-500 text-white"
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            </div>

                }
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-8">

              <button
                onClick={() =>{
                    setPage(prev => prev-1)
                }}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Previous
              </button>

              <span className="font-semibold">Page {userExpenseData.page} of {userExpenseData.totalpages}</span>

              <button
                onClick={() =>{
                    setPage(prev => prev+1)
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Next
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;