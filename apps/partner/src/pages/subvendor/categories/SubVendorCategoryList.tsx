import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import PartnerLayout from "../../../components/PartnerLayout";
import api from "../../../api/axios";

interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
  active: boolean;
  slug: string;
}

export default function SubVendorCategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await api.get(
        `/restful/v1/api/categories/vendors/${user.vendorId}`
      );
      setCategories(res.data.data || []);
    } catch (err) {
      console.error(err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <PartnerLayout role="SUB_VENDOR">
    <div className="py-10 px-4">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          My Categories
        </h1>
        <p className="text-gray-500 text-sm">
          Categories assigned to your vendor account
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Slug</th>
                <th className="p-3 text-left">Order</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Status</th>
              </tr>

              {loading && (
                <tr>
                  <td colSpan={7} className="p-4">
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                      Loading categories...
                    </div>
                  </td>
                </tr>
              )}
            </thead>

            <tbody>
              {!loading && categories.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-10 text-gray-500"
                  >
                    No categories found
                  </td>
                </tr>
              )}

              {!loading &&
                categories.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3">{c.id}</td>

                    <td className="p-3 font-semibold">
                      {c.name}
                    </td>

                    <td className="p-3">
                      {c.description}
                    </td>

                    <td className="p-3">{c.slug}</td>

                    <td className="p-3">
                      {c.displayOrder}
                    </td>

                    <td className="p-3">
                      {c.imageUrl ? (
                        <img
                          src={c.imageUrl}
                          alt={c.name}
                          onClick={() =>
                            window.open(c.imageUrl, "_blank")
                          }
                          className="w-10 h-10 rounded cursor-pointer hover:scale-105 transition"
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          c.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {c.active
                          ? "ACTIVE"
                          : "INACTIVE"}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </PartnerLayout>
  );
}