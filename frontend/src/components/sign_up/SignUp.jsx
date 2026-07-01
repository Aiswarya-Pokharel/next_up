import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUp() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-secondary/40 w-full max-w-sm rounded-lg shadow-md p-8">
      <h2 className="font-logo font-bold text-2xl text-logo text-center mb-1">
        NextUp
      </h2>
      <p className="text-content text-sm text-center mb-6">
        Create an account to get started
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* --------------name--------------- */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-semibold text-logo">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            id="text"
            type="username"
            name="username"
            placeholder="Enter your name"
            required
            className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* --------------email--------------- */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-semibold text-logo">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter a valid email"
            required
            className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* --------------password--------------- */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-semibold text-logo">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
            required
            minLength={8}
            className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute text-gray-800 right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* --------------signup button--------------- */}
        <button
          type="submit"
          className="bg-logo hover:bg-logo-hover text-white font-poppins font-semibold py-2 rounded-md transition-colors mt-2 cursor-pointer"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
