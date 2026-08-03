import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExpenseChart from "./ExpenseChart";
import RecentTransaction from "./RecentTransaction";

const MainContent = () => {
  const nav = useNavigate();

  const transaction = useSelector((store) => store.userTransaction);

  const totalIncome = transaction?.totalIncome || 0;
  const totalExpense = transaction?.totalExpense || 0;
  const balance = transaction?.balance || 0;
  const savings = balance;

  async function download() {
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/analytics/downloadPdf",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to download PDF");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "transactions-report.pdf";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  }

  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if(chartData.length !== 0){
      return 
    }
    async function getChartData() {

        const res = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/api/dashboard/chart",
            {
                credentials: "include"
            }
        );

        const data = await res.json();

        if (data.success) {
            setChartData(data.data);
        }
    }
    getChartData();
  }, []);

  return (
    <main className="flex-1 bg-slate-100 min-h-screen ml-20 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Here's what's happening with your finances today.
          </p>
        </div>
        
        <div className=" flex gap-5">
          <button
            onClick={() =>{
              download()
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg transition">
            Download report
          </button>

          <button
            onClick={() => {
              nav("/transactions");
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg transition"
          >
            + Add Transaction
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="rounded-2xl p-6 shadow-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600">
          <p>Total Balance</p>

          <h2 className="text-4xl font-bold mt-3">
            ₹{balance}
          </h2>
        </div>

        <div className="rounded-2xl p-6 shadow-lg text-white bg-gradient-to-r from-green-500 to-emerald-600">
          <p>Total Income</p>

          <h2 className="text-4xl font-bold mt-3">
            ₹{totalIncome}
          </h2>
        </div>

        <div className="rounded-2xl p-6 shadow-lg text-white bg-gradient-to-r from-red-500 to-pink-600">
          <p>Total Expense</p>

          <h2 className="text-4xl font-bold mt-3">
            ₹{totalExpense}
          </h2>
        </div>

        <div className="rounded-2xl p-6 shadow-lg text-white bg-gradient-to-r from-yellow-400 to-orange-500">
          <p>Total Savings</p>

          <h2 className="text-4xl font-bold mt-3">
            ₹{savings}
          </h2>
        </div>

      </div>

      {/* Chart + Budget */}
      <div className="grid lg:grid-cols-3 gap-6 mt-10">

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-2xl font-semibold text-slate-700 mb-5">
            Monthly Overview
          </h2>

          <div className="h-85 rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50 flex items-center justify-center">

              <ExpenseChart data ={chartData} />

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Budget Progress
          </h2>

          <div className="space-y-6">

            <div>
              <div className="flex justify-between">
                <span>Food</span>
                <span>65%</span>
              </div>

              <div className="bg-gray-200 rounded-full h-3 mt-2">
                <div className="bg-green-500 h-3 rounded-full w-2/3"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span>Shopping</span>
                <span>90%</span>
              </div>

              <div className="bg-gray-200 rounded-full h-3 mt-2">
                <div className="bg-purple-500 h-3 rounded-full w-11/12"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span>Transport</span>
                <span>40%</span>
              </div>

              <div className="bg-gray-200 rounded-full h-3 mt-2">
                <div className="bg-blue-500 h-3 rounded-full w-2/5"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span>Health</span>
                <span>25%</span>
              </div>

              <div className="bg-gray-200 rounded-full h-3 mt-2">
                <div className="bg-orange-500 h-3 rounded-full w-1/4"></div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mt-10">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-semibold">
            Recent Transactions
          </h2>

          <button className="text-indigo-600 hover:underline">
            View All
          </button>

        </div>

        <div className="overflow-x-auto">

          <RecentTransaction />

        </div>

      </div>

    </main>
  );
};

export default MainContent;