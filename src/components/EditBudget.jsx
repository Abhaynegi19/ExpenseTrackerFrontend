import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import { adduserBudget } from "../utils/userBudget";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditBudget = () => {
  const dispatch = useDispatch();
  const nav = useNavigate()
  const [addBudget, setAddBudget] = useState({
    total: "",
    food: "",
    shopping: "",
    travel: "",
    bills: "",
    entertainment: "",
    health: "",
  });

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

          // Fill the form with existing budget
          setAddBudget({
            total: data.budget.total || "",
            food: data.budget.food || "",
            shopping: data.budget.shopping || "",
            travel: data.budget.travel || "",
            bills: data.budget.bills || "",
            entertainment: data.budget.entertainment || "",
            health: data.budget.health || "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    getBudget();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddBudget((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const updateBudget = async () => {
    if (addBudget.total === "") {
      return toast.error("Enter Total Budget");
    }

    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/budget/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(addBudget),
        }
      );

      const data = await res.json();
      console.log(data.success)
      if (data.success) {
        dispatch(adduserBudget(data.budget));
        nav("/budget")
        toast.success("Budget Updated");

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <SidePanel />

        <div className="flex-1 p-8 mt-16">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              Edit Budget
            </h1>

            <div className="space-y-6">
              {/* Total */}
              <div>
                <label className="block font-semibold mb-2">
                  Total Budget
                </label>

                <input
                  type="number"
                  name="total"
                  value={addBudget.total}
                  onChange={handleChange}
                  placeholder="Enter Total Budget"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Food */}
              <div>
                <label className="block font-semibold mb-2">
                  Food Budget
                </label>

                <input
                  type="number"
                  name="food"
                  value={addBudget.food}
                  onChange={handleChange}
                  placeholder="Enter Food Budget"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* Shopping */}
              <div>
                <label className="block font-semibold mb-2">
                  Shopping Budget
                </label>

                <input
                  type="number"
                  name="shopping"
                  value={addBudget.shopping}
                  onChange={handleChange}
                  placeholder="Enter Shopping Budget"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              {/* Travel */}
              <div>
                <label className="block font-semibold mb-2">
                  Travel Budget
                </label>

                <input
                  type="number"
                  name="travel"
                  value={addBudget.travel}
                  onChange={handleChange}
                  placeholder="Enter Travel Budget"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 outline-none"
                />
              </div>

              {/* Bills */}
              <div>
                <label className="block font-semibold mb-2">
                  Bills Budget
                </label>

                <input
                  type="number"
                  name="bills"
                  value={addBudget.bills}
                  onChange={handleChange}
                  placeholder="Enter Bills Budget"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              {/* Entertainment */}
              <div>
                <label className="block font-semibold mb-2">
                  Entertainment Budget
                </label>

                <input
                  type="number"
                  name="entertainment"
                  value={addBudget.entertainment}
                  onChange={handleChange}
                  placeholder="Enter Entertainment Budget"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>

              {/*Health*/}
              <div>
                <label className="block font-semibold mb-2">
                  Health Budget
                </label>

                <input
                  type="number"
                  name="health"
                  value={addBudget.health}
                  onChange={handleChange}
                  placeholder="Enter Health Budget"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>

              <button
                onClick={updateBudget}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Save Budget
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBudget;