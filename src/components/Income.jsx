import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import { useSelector } from "react-redux";

const Income = () => {
  const transaction = useSelector((store) => store.userTransaction);

  const totalIncome = transaction?.totalIncome || 0;
  const totalExpense = transaction?.totalExpense || 0;
  const balance = transaction?.balance || 0;
  const [income,setIncome] = useState([])

  useEffect(() =>{
    async function getIncomeTransactions(){
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/transactions/getIncomeTrans",{
            method : "GET",
            headers : {
                "Conten-type" : "application/json"
            },
            credentials : "include"
        })
        const data = await res.json()
        if(data.success){
            setIncome(data.userIncomeTransactions)
        }
    }
    getIncomeTransactions()
  },[])

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        <SidePanel />

        <div className="flex-1 mt-20 ml-44 p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">
            Income Overview
          </h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
              <p className="text-gray-500 font-medium">Total Income</p>
              <h2 className="text-4xl font-bold text-green-600 mt-3">
                ₹{totalIncome}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
              <p className="text-gray-500 font-medium">Total Expenses</p>
              <h2 className="text-4xl font-bold text-red-500 mt-3">
                ₹{totalExpense}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
              <p className="text-gray-500 font-medium">Current Balance</p>
              <h2 className="text-4xl font-bold text-blue-600 mt-3">
                ₹{balance}
              </h2>
            </div>
          </div>

          {/* Recent Income */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-5">
              Recent Income Transactions
            </h2>

            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3">Title</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {income.length > 0 ? income.map((item) =>{
                    return <tr>
                            <td>{item.title}</td>
                            <td>{item.category}</td>
                            <td className="text-green-500">+₹{item.amount}</td>
                            <td>{item.date.slice(0,10)}</td>
                        </tr>
                }) :<td className="text-gray-400">No income Transaction added</td>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;