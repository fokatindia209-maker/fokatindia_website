import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function CreateUser() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await axios.post(
        `${API}/restful/v1/api/users/register`,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }
      );

      alert("User created successfully");
      navigate("/users");
    } catch (err: any) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/users")}
          className="mb-4 text-gray-600 hover:text-black font-medium"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-center mb-6">
          Create User
        </h1>

        {/* Progress Bar */}
        {loading && (
          <div className="w-full bg-gray-200 h-2 rounded mb-6 overflow-hidden">
            <div className="h-full bg-blue-600 animate-pulse w-full"></div>
          </div>
        )}

        <input
          name="name"
          placeholder="Name"
          className="w-full border rounded-lg p-3 mb-4"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3 mb-4"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          className="w-full border rounded-lg p-3 mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3 mb-6"
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition
            ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
          `}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </div>
    </div>
  );
}