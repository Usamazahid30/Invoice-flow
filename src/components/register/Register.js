import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import registerImage from "../../../src/marketing.svg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Clear any previous errors
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/dashboard", { state: { email: userCredential.user.email } });
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1  text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${registerImage})`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="  font-serif text-2xl xl:text-4xl font-extrabold text-blue-900">
                INVOICE FLOW{" "}
              </h1>
              <h2 className="  font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                CREATE YOUR ACCOUNT
              </h2>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4 ">
                <form onSubmit={submitHandler}>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="w-full mb-2 px-5  py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="w-full mb-2 px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Password"
                  />
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Confirm Password"
                  />
                  {error && (
                    <p className="text-red-500 text-sm text-center mt-2">
                      {error}
                    </p>
                  )}
                  <button className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Sign Up</span>
                  </button>
                </form>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <a href="/login">
                    <span className="text-blue-900 font-semibold">Sign in</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
