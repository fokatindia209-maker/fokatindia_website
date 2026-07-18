import UserLayout from "../components/UserLayout";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
  active: boolean;
}

export default function Categories() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };


  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <UserLayout>
      <div className="space-y-6 py-4 px-4">

        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-10">
            Loading categories...
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filtered.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  localStorage.setItem(
                    "categoryId",
                    cat.id.toString()
                  );

                  navigate(`/service/${cat.id}`);
                }}
                // onClick={() => navigate(`/service/${cat.id}`)}
                className="bg-white rounded-2xl shadow hover:shadow-md transition cursor-pointer p-4 text-center"
              >
                <div className="w-20 h-20 mx-auto flex items-center justify-center">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>

                <p className="mt-3 font-semibold text-gray-700">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>


    </UserLayout>
  );
}