import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";  // ✅ ঠিক প্যাকেজ
import SocialLogin from "../../../authentication/sociallogin/SocialLogin";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth";            // আপনার কাস্টম auth hook

const Login = () => {
  const {  signInUser } = UseAuth();                       // 🔑 বাস্তব লগইন ফাংশন
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await  signInUser(data.email, data.password);      
      Swal.fire({
        icon: "success",
        title: "Login successful!",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate(from, { replace: true });               
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login failed!",
        text: err.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center bg-gray-50 px-4">
      {/* Optional: Left Side Image */}
      <div className="hidden lg:block w-full lg:w-1/2">
        
      </div>
  
      {/* Login Card */}
      <div className="card bg-base-100 w-full max-w-md shadow-2xl my-10">
        <div className="card-body">
          <h1 className="font-bold text-4xl mb-4 text-center">Login Now</h1>
  
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
  
            {/* Password */}
            <div>
              <label className="label">Password</label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                })}
                type="password"
                className="input input-bordered w-full"
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
  
            {/* Forgot Password */}
            <div className="text-right">
              <a className="link link-hover">Forgot password?</a>
            </div>
  
            <button type="submit" className="btn btn-neutral w-full">Login</button>
  
            <p className="text-sm text-center mt-2">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">Please register</Link>
            </p>
          </form>
  
          <SocialLogin />
        </div>
      </div>
    </div>
  );
  
};

export default Login;
