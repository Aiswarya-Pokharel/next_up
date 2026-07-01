import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Login({ onClose }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-secondary w-full max-w-sm rounded-lg shadow-md p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-content hover:text-logo cursor-pointer"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <h2 className="font-logo font-bold text-2xl text-logo text-center mb-1">
          NextUp
        </h2>
        <p className="text-content text-sm text-center mb-6">
          Log in to keep your priorities on track
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-logo"
            >
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
          </div>

          <button
            type="submit"
            className="bg-logo hover:bg-logo-hover text-black font-poppins font-semibold py-2 rounded-md transition-colors mt-2 cursor-pointer"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
