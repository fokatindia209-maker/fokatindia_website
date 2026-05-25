import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tag, FileText, ArrowLeft, Loader2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

export default function CreateCategory() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/restful/v1/api/categories`,
        { ...form },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(res.data.message || "Category created");
      navigate("/categories");
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to create");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Tag className="w-7 h-7 text-blue-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Create Category
              </h1>
              <p className="text-sm text-gray-500">
                Add new system category
              </p>
            </div>
          </div>

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>

            <div className="relative">
              <FileText className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

              <input
                name="name"
                placeholder="Enter category name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              placeholder="Enter category description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Tag className="w-5 h-5" />
                Create Category
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}