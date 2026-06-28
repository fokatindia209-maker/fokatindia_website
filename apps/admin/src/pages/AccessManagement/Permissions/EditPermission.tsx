// ============================================
// EditPermission.tsx
// ============================================

import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

export default function EditPermission() {
  const { permissionId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  // GET BY ID
  const fetchData = async () => {
    const res = await api.get(
      `/restful/v1/api/permissions/${permissionId}`
    );

    setForm(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE
  const handleUpdate = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put(
        `/restful/v1/api/permissions/${permissionId}`,
        form
      );

      alert("Updated successfully");
      navigate("/permissions");
    } catch (err: any) {
      alert(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">

      <div className="bg-white p-6 rounded-xl shadow w-[500px]">

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Edit Permission</h2>

          <button onClick={() => navigate("/permissions")}>
            <ArrowLeft />
          </button>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
            placeholder="Permission Name"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
            placeholder="Description"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-xl"
          >
            <Save size={18} /> {loading ? "Updating..." : "Update"}
          </button>

        </form>

      </div>

    </div>
  );
}
