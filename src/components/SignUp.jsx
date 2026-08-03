import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const nav = useNavigate();

  const [verifyOTP, setVerifyOTP] = useState(false);
  const [sendBtn,setSendBtn] = useState(false)
  const [isVerified, setIsVerified] = useState(false);

  const [userInfo, setUserInfo] = useState({
    email: "",
    otp: "",
    username: "",
    password: "",
  });

  async function sendOTP() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/send-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.email,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setVerifyOTP(true);
      setSendBtn(true);
      toast.success(`OTP sent to ${userInfo.email}`);
    } else {
      toast.error(data.error || data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong. Please try again.");
  }
}

  async function verifyotp() {
  try {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/auth/verify-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: userInfo.otp,
          email: userInfo.email,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      toast.success(data.message);
      setIsVerified(true);
      setVerifyOTP(false);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
}

  async function signup() {
  if (!isVerified) {
    toast.error("Please verify your email first.");
    return;
  }

  try {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.email,
          username: userInfo.username,
          password: userInfo.password,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      toast.success(data.message);
      nav("/login");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
}

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-2">
          Expense Tracker
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Create your account to manage expenses
        </p>

        <div className="flex flex-col gap-6">
          {/* Email + OTP */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="ip-email"
              className="text-sm font-semibold text-slate-700"
            >
              Email
            </label>

            <div className="flex gap-2">
              <input
                id="ip-email"
                type="email"
                placeholder="example@gmail.com"
                className="h-12 flex-1 px-4 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    email: e.target.value,
                  });
                }}
              />

              <button
                onClick={() =>{
                  sendOTP()
                  setSendBtn(true)
                }}
                className="text-white px-4 rounded-xl bg-green-600 hover:bg-green-700"
                disabled = {sendBtn}
              >
                Send OTP
              </button>
            </div>

            {verifyOTP && (
              <div className="flex gap-2 mt-2">
                <input
                  id="ip-otp"
                  type="number"
                  placeholder="Enter 6 digit OTP"
                  className="h-12 flex-1 px-4 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  onChange={(e) => {
                    setUserInfo({
                      ...userInfo,
                      otp: e.target.value,
                    });
                  }}
                />

                <button
                  className="text-white px-5 rounded-xl bg-green-600 hover:bg-green-700"
                  onClick={verifyotp}
                >
                  Verify
                </button>
              </div>
            )}
          </div>

          {/* Username */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="ip-username"
              className="text-sm font-semibold text-slate-700"
            >
              Username
            </label>

            <input
              id="ip-username"
              type="text"
              placeholder="John Doe"
              className="h-12 px-4 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  username: e.target.value,
                });
              }}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="ip-password"
              className="text-sm font-semibold text-slate-700"
            >
              Password
            </label>

            <input
              id="ip-password"
              type="password"
              placeholder="Qwerty@123"
              className="h-12 px-4 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  password: e.target.value,
                });
              }}
            />
          </div>

          {/* Sign Up */}
          <button
            disabled={!isVerified}
            onClick={signup}
            className={`h-12 rounded-xl font-semibold transition-all duration-200 ${
              isVerified
                ? "bg-blue-600 hover:bg-blue-700 active:scale-95 text-white"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            Sign Up
          </button>
        </div>

        <p className="text-center text-slate-500 mt-6">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 hover:underline transition"
            onClick={() => nav("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;