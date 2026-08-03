import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import { useNavigate } from "react-router-dom";
import { addUserData } from "../utils/user";

const Profile = () => {
    const user = useSelector((store) => store.userInfo);
    const [isEditing,setIsEditing] = useState(false);
    const nav = useNavigate()
    const dispatch = useDispatch()
    const [updatedProfile,setUpdatedProfile] = useState({
        name :"",
        occupation : "",
        displayPicture : "",
        city : "",
        age : ""
    })
    
    async function updateProfile(){
        try {
            const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/profile/",{
                method : "PATCH",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify()
            })
            const data = await res.json(updatedProfile)
            if(data.success){
                toast.success("Profile Updated Successfully")
                dispatch(addUserData(data.user))
            }
        } catch (error) {
            toast.error("Profile Updation Failed")
        }
    }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        <SidePanel />

        <div className="flex-1 mt-20 px-10 py-8">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">

            {/* Header */}
            <div className="bg-linear-to-r from-blue-600 to-indigo-700 h-40 relative">

              <img
                src={user.displayPicture}
                alt={user.name}
                className="w-36 h-36 rounded-full border-4 border-white object-cover absolute left-10 -bottom-16 shadow-lg"
              />

              <div className="absolute right-10 bottom-5 text-white text-right">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p>{user.occupation}</p>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                    user.isCompleted
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {user.isCompleted
                    ? "Profile Completed"
                    : "Incomplete Profile"}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="pt-24 px-10 pb-10">

              {/* Monthly Income Card */}
              <div className="mb-10 bg-green-50 border border-green-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-green-700">
                  Monthly Income
                </h2>

                <p className="text-4xl font-bold text-green-600 mt-2">
                  ₹{user?.monthlyIncome?.toLocaleString()}
                </p>
              </div>

              {/* User Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={user.name}
                    className="w-full border rounded-lg px-4 py-3 bg-slate-50 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    Username
                  </label>

                  <input
                    type="text"
                    value={user.username}
                    readOnly
                    className="w-full border rounded-lg px-4 py-3 bg-slate-50 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full border rounded-lg px-4 py-3 bg-slate-50 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    Occupation
                  </label>

                  <input
                    type="text"
                    value={user.occupation}
                    readOnly
                    className="w-full border rounded-lg px-4 py-3 bg-slate-50 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    Age
                  </label>

                  <input
                    type="number"
                    value={user.age}
                    readOnly
                    className="w-full border rounded-lg px-4 py-3 bg-slate-50 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    City
                  </label>

                  <input
                    type="text"
                    value={user.city}
                    readOnly
                    className="w-full border rounded-lg px-4 py-3 bg-slate-50 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    Joined On
                  </label>

                  <input
                    type="text"
                    value={new Date(user.createdAt).toLocaleDateString()}
                    readOnly
                    className="w-full border rounded-lg px-4 py-3 bg-slate-50 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    Last Updated
                  </label>

                  <input
                    type="text"
                    value={new Date(user.updatedAt).toLocaleDateString()}
                    readOnly
                    className="w-full border rounded-lg px-4 py-3 bg-slate-50 outline-none"
                  />
                </div>
              </div>

              {/* Button */}
              <div className="mt-10 flex justify-end">
                {isEditing && 
                <div className="flex gap-2.5">
                    <button
                        onClick={() =>{
                            setIsEditing(!isEditing)
                            updateProfile()
                        }}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition">
                    Save
                    </button>
                    <button
                        onClick={() =>{
                            setIsEditing(!isEditing)
                            updateProfile()
                        }}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition">
                    Cancel
                    </button>
                </div>
                }
                {!isEditing && <button
                    onClick={() =>{
                        setIsEditing(!isEditing)
                    }}
                 className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition">
                  Edit Profile
                </button>}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;