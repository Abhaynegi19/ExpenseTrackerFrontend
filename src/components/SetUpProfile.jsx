import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUserData } from "../utils/user";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const SetUpProfile = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    occupation: "",
    monthlyIncome: "",
    city: "",
    bio: "",
  });

  async function saveProfile() {

    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/profile/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(profile),
    });
    const data = await res.json()

    if(data.success){
        toast.success("Profile setUp Successfully")
        dispatch(addUserData(data.user))
        nav("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-2">
          Set Up Your Profile
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Tell us a little about yourself to personalize your experience.
        </p>

        <div className="flex flex-col gap-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              className="h-12 px-4 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
            />
          </div>

          {/* Age */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Age
            </label>

            <input
              type="number"
              placeholder="25"
              className="h-12 px-4 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              onChange={(e) =>
                setProfile({
                  ...profile,
                  age: e.target.value,
                })
              }
            />
          </div>

          {/* Occupation */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Occupation
            </label>

            <input
              type="text"
              placeholder="Software Engineer"
              className="h-12 px-4 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              onChange={(e) =>
                setProfile({
                  ...profile,
                  occupation: e.target.value,
                })
              }
            />
          </div>

          {/* Monthly Income */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Monthly Income (₹)
            </label>

            <input
              type="number"
              placeholder="50000"
              className="h-12 px-4 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              onChange={(e) =>
                setProfile({
                  ...profile,
                  monthlyIncome: e.target.value,
                })
              }
            />
          </div>

          {/* City */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              City
            </label>

            <input
              type="text"
              placeholder="Delhi"
              className="h-12 px-4 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              onChange={(e) =>
                setProfile({
                  ...profile,
                  city: e.target.value,
                })
              }
            />
          </div>

          {/* Save Button */}
          <button
            onClick={saveProfile}
            className="bg-blue-600 text-white h-12 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetUpProfile;