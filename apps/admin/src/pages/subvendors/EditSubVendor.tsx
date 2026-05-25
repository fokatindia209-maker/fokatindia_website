import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, User } from "lucide-react";

const API = "http://localhost:8001/restful/v1/api";

interface SubVendor {
  name: string;
}

export default function EditSubVendor() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<SubVendor>({
    name: "",
  });

  // ================= FETCH LOGGED-IN SUBVENDOR =================
  const fetchSubVendor = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/subvendors/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setForm(res.data.data || res.data);
    } catch (err) {
      console.error("Error fetching subVendor", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubVendor();
  }, []);

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      setLoading(true);

      await axios.put(
        `${API}/subvendors/me`,
        {
          name: form.name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("SubVendor updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      {/* CARD */}
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-xl">
            <User className="text-blue-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Edit SubVendor</h1>
            <p className="text-sm text-gray-500">
              Update your profile details
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="space-y-4">

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-600">
              Name
            </label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full border rounded-xl p-3 mt-1"
              placeholder="Enter name"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Save size={18} />
            {loading ? "Updating..." : "Update SubVendor"}
          </button>
        </div>
      </div>
    </div>
  );
}