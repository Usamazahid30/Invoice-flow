import React, { useState } from "react";
import loginImage from "../../../src/login.svg";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { resetPassword } from "../../firebase"; // Import the resetPassword function
import Swal from "sweetalert2"; // Import SweetAlert2

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for the error message

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/dashboard", { state: { email: user.email } });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Invalid email or password. Please try again."); // Set the error message
      });
  };

  const handlePasswordReset = () => {
    Swal.fire({
      title: "Reset Password",
      input: "email",
      inputLabel: "Enter your email",
      inputPlaceholder: "Enter your email",
      showCancelButton: true,
      confirmButtonText: "Send Reset Email",
      cancelButtonText: "Cancel",
      preConfirm: (resetEmail) => {
        return resetPassword(resetEmail)
          .then(() => {
            Swal.fire("Success", "Password reset email sent!", "success");
          })
          .catch((error) => {
            Swal.fire("Error", "Error sending password reset email.", "error");
          });
      },
    });
  };

  return (
    // <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
    //   <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
    //     <div
    //       className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
    //       style={{
    //         backgroundImage: `url(${loginImage})`,
    //       }}
    //     ></div>
    //     <div className="w-full p-8 lg:w-1/2">
    //       <p className="font-serif text-center text-2xl xl:text-4xl font-extrabold text-blue-900">
    //         Welcome back!
    //       </p>
    //       <form onSubmit={submitHandler}>
    //         <div className="mt-4">
    //           <label className="block text-gray-700 text-sm font-bold mb-2">
    //             Email Address
    //           </label>
    //           <input
    //             onChange={(e) => {
    //               setEmail(e.target.value);
    //             }}
    //             className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
    //             type="email"
    //             placeholder="Enter your email"
    //           />
    //         </div>
    //         <div className="mt-4 relative">
    //           <label className="block text-gray-700 text-sm font-bold mb-2">
    //             Password
    //           </label>
    //           <input
    //             onChange={(e) => {
    //               setPassword(e.target.value);
    //             }}
    //             className="w-full px-5 py-3 pr-10 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
    //             type={showPassword ? "text" : "password"}
    //             placeholder="Password"
    //           />
    //           <div
    //             className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
    //             onClick={() => setShowPassword(!showPassword)}
    //           >
    //             {showPassword ? <FaEye /> : <FaEyeSlash />}
    //           </div>
    //           <a
    //             href="#"
    //             className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
    //             onClick={handlePasswordReset}
    //           >
    //             Forget Password?
    //           </a>
    //         </div>
    //         {errorMessage && (
    //           <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
    //         )}
    //         <div className="mt-8">
    //           <button className="bg-blue-900 font-bold py-2 px-4 hover:bg-indigo-700 text-gray-100 w-full rounded-lg">
    //             Login
    //           </button>
    //         </div>
    //       </form>
    //       <a
    //         href="/register"
    //         className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
    //       ></a>
    //       <div className="mt-4 flex items-center w-full text-center">
    //         <a
    //           href="/register"
    //           className="text-xs text-gray-500 capitalize text-center w-full"
    //         >
    //           Don&apos;t have any account yet?
    //           <span className="text-blue-900"> Sign Up</span>
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className=" flex justify-center">
<h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Something Went Wrong</h1>
</div>
  );
};

export default Login;
