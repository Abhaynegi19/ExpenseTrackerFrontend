import React from "react";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import { useSelector } from "react-redux";

const Category = () => {
  const expenses =
    useSelector((store) => store.userTransaction.allExpenses?.expenses) || [];

  // Group expenses by category
  const categoryData = Object.entries(
    expenses.reduce((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = 0;
      }

      acc[curr.category] += Number(curr.amount);

      return acc;
    }, {})
  ).map(([category, amount]) => ({
    category,
    amount,
  }));

  const totalExpense = categoryData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const colors = {
    Food: "bg-red-500",
    Travel: "bg-blue-500",
    Shopping: "bg-pink-500",
    Bills: "bg-yellow-500",
    Entertainment: "bg-purple-500",
    Health: "bg-green-500",
    Salary: "bg-emerald-500",
    Other: "bg-gray-500",
  };

  const icons = {
    Food: "🍔",
    Travel: "✈️",
    Shopping: "🛍️",
    Bills: "💡",
    Entertainment: "🎮",
    Health: "🏥",
    Salary: "💰",
    Other: "📦",
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        <SidePanel />

        <div className="flex-1 ml-44 mt-20 p-8">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-slate-800 mb-8">
            Expense Categories
          </h1>

          {/* Total */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <p className="text-gray-500 text-lg">Total Expenses</p>

            <h2 className="text-5xl font-bold text-red-500 mt-2">
              ₹{totalExpense}
            </h2>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {categoryData.length > 0 ? (
              categoryData.map((item) => {
                const percentage =
                  totalExpense > 0
                    ? ((item.amount / totalExpense) * 100).toFixed(1)
                    : 0;

                return (
                  <div
                    key={item.category}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="text-4xl">
                        {icons[item.category] || "📦"}
                      </div>

                      <span
                        className={`${
                          colors[item.category] || "bg-gray-500"
                        } text-white px-3 py-1 rounded-full text-sm`}
                      >
                        {percentage}%
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold mb-2">
                      {item.category}
                    </h2>

                    <p className="text-3xl font-semibold text-slate-700">
                      ₹{item.amount}
                    </p>

                    <div className="mt-5 w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                      <div
                        className={`${
                          colors[item.category] || "bg-gray-500"
                        } h-3 rounded-full`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      ></div>
                    </div>

                    <p className="text-gray-500 mt-3">
                      {percentage}% of your total expenses
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full bg-white rounded-2xl shadow-lg p-10 text-center">
                <div className="text-6xl mb-4">📊</div>

                <h2 className="text-2xl font-semibold text-gray-700">
                  No Expenses Found
                </h2>

                <p className="text-gray-500 mt-2">
                  Add some expenses to view category-wise analytics.
                </p>
              </div>
            )}
          </div>

          {/* Summary */}
          {categoryData.length > 0 && (
            <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-5">
                Category Summary
              </h2>

              <div className="space-y-4">
                {categoryData
                  .sort((a, b) => b.amount - a.amount)
                  .map((item) => (
                    <div
                      key={item.category}
                      className="flex justify-between items-center border-b pb-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {icons[item.category] || "📦"}
                        </span>

                        <span className="font-semibold">
                          {item.category}
                        </span>
                      </div>

                      <span className="text-lg font-bold">
                        ₹{item.amount}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;