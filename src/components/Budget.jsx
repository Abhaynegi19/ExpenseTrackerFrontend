import React, { useEffect } from "react";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adduserBudget } from "../utils/userBudget";

const Budget = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const budget = useSelector((store) => store.userBudget);
  const expenses =
    useSelector((store) => store.userTransaction.allExpenses?.expenses) || [];
  const totalSpent = useSelector(
    (store) => store.userTransaction.totalExpense
  );

  const totalBudget = budget?.total || 0;
  const remaining = totalBudget - totalSpent;

  const percentage =
    totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  // Group expenses category wise
  const filteredExpenses = Object.entries(
    expenses.reduce((acc, curr) => {
      const category = curr.category;

      if (!acc[category]) {
        acc[category] = 0;
      }

      acc[category] += curr.amount;

      return acc;
    }, {})
  ).map(([category, amount]) => ({
    category,
    amount,
  }));

  useEffect(() => {
    async function getBudget() {
      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/budget/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success) {
          dispatch(adduserBudget(data.budget));
        }
      } catch (err) {
        console.log(err);
      }
    }

    getBudget();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        <SidePanel />

        <div className="flex-1 ml-44 mt-20 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Budget Overview
            </h1>

            <div className="flex gap-5">
              <button
                onClick={() => nav("/addbudget")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                + Set Budget
              </button>

              <button
                onClick={() => nav("/editbudget")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Edit Budget
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
              <p className="text-gray-500">Total Budget</p>

              <h2 className="text-4xl font-bold text-blue-600 mt-3">
                ₹{totalBudget}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
              <p className="text-gray-500">Total Spent</p>

              <h2 className="text-4xl font-bold text-red-500 mt-3">
                ₹{totalSpent}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
              <p className="text-gray-500">Remaining</p>

              <h2 className="text-4xl font-bold text-green-600 mt-3">
                ₹{remaining}
              </h2>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
            <div className="flex justify-between mb-3">
              <h2 className="text-xl font-semibold">
                Monthly Budget Progress
              </h2>

              <span className="font-bold">
                {percentage.toFixed(2)}%
              </span>
            </div>

            <div className="w-full h-5 rounded-full bg-gray-200 overflow-hidden">
              <div
                className={
                  percentage < 50
                    ? "bg-green-600 h-full"
                    : percentage < 80
                    ? "bg-yellow-500 h-full"
                    : "bg-red-500 h-full"
                }
                style={{
                  width: `${Math.min(percentage, 100)}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Category Budgets */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-5">
              Category Budgets
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((item) => {
                  const categoryBudget =
                    budget[item.category.toLowerCase()] || 0;

                  const categoryPercentage =
                    categoryBudget > 0
                      ? (item.amount / categoryBudget) * 100
                      : 0;

                  return (
                    <div
                      key={item.category}
                      className="bg-white rounded-2xl shadow-lg p-6"
                    >
                      <h3 className="text-xl font-semibold mb-4">
                        {item.category}
                      </h3>

                      <p>Budget: ₹{categoryBudget}</p>

                      <p>Spent: ₹{item.amount}</p>

                      <p>
                        Remaining: ₹{categoryBudget - item.amount}
                      </p>

                      <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
                        <div
                          className={
                            categoryPercentage < 50
                              ? "bg-green-500 h-3"
                              : categoryPercentage < 80
                              ? "bg-yellow-500 h-3"
                              : "bg-red-500 h-3"
                          }
                          style={{
                            width: `${Math.min(
                              categoryPercentage,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-gray-500 text-lg">
                  No expenses yet.
                </div>
              )}
            </div>
          </div>

          {/* Alerts */}
          {/* <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold mb-5">
              Budget Alerts
            </h2>

            <ul className="space-y-3 text-lg">
              <li className="text-red-500">
                ⚠ Shopping budget exceeded by ₹200
              </li>

              <li className="text-yellow-600">
                ⚠ Food budget is almost full
              </li>

              <li className="text-green-600">
                ✓ Travel budget is under control
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Budget;