import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../components/redux-Toolkit/features/user/userActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const dispatch = useDispatch();
  const { loader, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
    
    try {
      const response = await dispatch(registerUser(formData));
      console.log("Response ", response);
      
      if (response.payload?.success) {
        toast.success(response.payload.message || "Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (response.payload?.message) {
        // If there's a specific message from backend but not success
        toast.info(response.payload.message);
      }
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    }
  };

  // Show error toast when error state changes
  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Your Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="col-span-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Last Name */}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="col-span-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="col-span-2 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="col-span-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {/* City */}
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="col-span-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="col-span-2 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loader}
            className="col-span-2 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loader ? "Loading..." : "Register"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Register;