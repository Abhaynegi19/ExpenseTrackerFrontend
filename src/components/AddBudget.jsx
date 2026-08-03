import React, { useState } from "react";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import { useDispatch } from "react-redux";
import { adduserBudget } from "../utils/userBudget";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddBudget = () => {

    const [addBudget,setAddBudget] = useState({
        total : "",
        food : "",
        travel : "",
        shopping : "",
        bills : "",
        entertainment : "",
    })
    const nav = useNavigate()

    async function addbudget() {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/budget/add",{
            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            credentials : "include",
            body : JSON.stringify(addBudget)
        })
        const data = await res.json()
        if(data.success){
            toast.success("Budget Added Successfully")
            nav("/budget")
        }
    }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <SidePanel />

        <div className="flex-1 p-8 mt-16">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              Add Budget
            </h1>

            <div className="space-y-6">
              {/* Total Budget */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Total Budget
                </label>
                <input
                    onChange={(e) =>{
                        setAddBudget({...addBudget,
                            total : e.target.value
                        })
                    }}
                  type="number"
                  placeholder="Enter Total Budget"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Food */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Food Budget
                </label>
                <input
                    onChange={(e) =>{
                        setAddBudget({...addBudget,
                            food : e.target.value
                        })
                    }}
                  type="number"
                  placeholder="Enter Food Budget"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Shopping */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Shopping Budget
                </label>
                <input
                    onChange={(e) =>{
                        setAddBudget({...addBudget,
                            shopping : e.target.value
                        })
                    }}
                  type="number"
                  placeholder="Enter Shopping Budget"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Travel */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Travel Budget
                </label>
                <input
                    onChange={(e) =>{
                        setAddBudget({...addBudget,
                            travel : e.target.value
                        })
                    }}
                  type="number"
                  placeholder="Enter Travel Budget"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Bills */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Bills Budget
                </label>
                <input
                    onChange={(e) =>{
                        setAddBudget({...addBudget,
                            bills : e.target.value
                        })
                    }}
                  type="number"
                  placeholder="Enter Bills Budget"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* entertainment*/ }
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Entertainment Budget
                </label>
                <input
                    onChange={(e) =>{
                        setAddBudget({...addBudget,
                            entertainment : e.target.value
                        })
                    }}
                  type="number"
                  placeholder="Enter Bills Budget"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Button */}
              <div className="pt-4">
                <button
                    onClick={() =>{
                        if(addBudget.total !== ""){
                            addbudget()
                        }
                        else{
                            toast.error("Enter Total budget")
                        }
                    }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300">
                  Save Budget
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBudget;