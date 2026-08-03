import React from "react";
import { useSelector } from "react-redux";

const RecentTransaction = () => {
  const recentTransactions = useSelector(
    (store) => store?.userTransaction
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b bg-linear-to-r from-blue-600 to-indigo-600">
        <h2 className="text-xl font-bold text-white">
          Recent Transactions
        </h2>
      </div>

      {recentTransactions.recent.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr className="text-slate-700">
                <th className="text-left px-6 py-4 font-semibold">Title</th>
                <th className="text-left px-6 py-4 font-semibold">
                  Category
                </th>
                <th className="text-left px-6 py-4 font-semibold">
                  Amount
                </th>
                <th className="text-left px-6 py-4 font-semibold">Date</th>
                <th className="text-left px-6 py-4 font-semibold">Type</th>
              </tr>
            </thead>

            {recentTransactions.recent.map((item) => {
              return (
                <tbody key={item._id}>
                  <tr className="border-b last:border-none hover:bg-blue-50 transition-all duration-200">
                    <td className="px-6 py-5 font-medium text-slate-800">
                      {item.title}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {item.category}
                    </td>

                    <td
                      className={`px-6 py-5 font-bold ${
                        item.type === "income"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.type === "income"
                        ? `+₹${item.amount}`
                        : `-₹${item.amount}`}
                    </td>

                    <td className="px-6 py-5 text-slate-500">
                      {item.date.slice(0, 10)}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.type === "income"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-xl font-semibold text-slate-700">
            No Recent Transactions
          </h2>
          <p className="text-slate-500 mt-2">
            Your latest transactions will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentTransaction;