// ============================================
// RolesList.tsx
// PROFESSIONAL ROLES MANAGEMENT SCREEN
// ============================================

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Shield,
  Plus,
  Search,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;
interface Role {
  roleId: number;
  name: string;
  description: string;
}

export default function RolesList() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState<Role[]>(
    []
  );

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  // ============================================
  // FETCH ROLES
  // ============================================

  const fetchRoles = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/restful/v1/api/roles`);

      setRoles(res.data.data || []);
    } catch (error) {
      console.error(
        "Failed to fetch roles",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // ============================================
  // FILTERED ROLES
  // ============================================

  const filteredRoles = roles.filter(
    (role) =>
      role.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      role.description
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // ============================================
  // DELETE ROLE
  // ============================================

  const handleDelete = async (
    roleId: number
  ) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this role?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API}/restful/v1/api/roles/${roleId}`
      );

      alert("Role deleted successfully");

      fetchRoles();
    } catch (error) {
      console.error(error);

      alert("Failed to delete role");
    }
  };

  return (
    <div className="py-12">
      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Roles Management
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage system roles and access
          </p>
        </div>

        <button
          onClick={() =>
            navigate(
              "/roles/create"
            )
          }
          className="
            flex items-center gap-2
            bg-blue-600 hover:bg-blue-700
            text-white
            px-5 py-3
            rounded-xl
            shadow
            transition
          "
        >
          <Plus size={18} />
          Create Role
        </button>
      </div>

      {/* ===================================== */}
      {/* SEARCH */}
      {/* ===================================== */}

      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <div className="relative">
          <Search
            size={18}
            className="
              absolute left-3 top-3.5
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search roles..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              border border-gray-300
              rounded-xl
              pl-10 pr-4 py-3
              outline-none
              focus:ring-2 focus:ring-blue-500
            "
          />
        </div>
      </div>

      {/* ===================================== */}
      {/* LOADING */}
      {/* ===================================== */}

      {loading && (
        <div className="text-center py-20">
          <div
            className="
              h-10 w-10
              border-4 border-blue-600
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="mt-4 text-gray-500">
            Loading roles...
          </p>
        </div>
      )}

      {/* ===================================== */}
      {/* ROLES GRID */}
      {/* ===================================== */}

      {!loading && (
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >
          {filteredRoles.map((role) => (
            <div
              key={role.roleId}
              className="
                bg-white
                rounded-3xl
                shadow-lg
                p-6
                hover:shadow-2xl
                transition
                border border-gray-100
              "
            >
              {/* TOP */}

              <div className="flex items-start justify-between">
                <div
                  className="
                    h-14 w-14
                    rounded-2xl
                    bg-blue-100
                    flex items-center justify-center
                  "
                >
                  <Shield
                    size={28}
                    className="text-blue-600"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/roles/edit/${role.roleId}`
                      )
                    }
                    className="
                      h-9 w-9
                      rounded-xl
                      bg-yellow-100
                      flex items-center justify-center
                      text-yellow-700
                      hover:bg-yellow-200
                    "
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        role.roleId
                      )
                    }
                    className="
                      h-9 w-9
                      rounded-xl
                      bg-red-100
                      flex items-center justify-center
                      text-red-700
                      hover:bg-red-200
                    "
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* ROLE INFO */}

              <div className="mt-5">
                <h2 className="text-xl font-bold text-gray-800">
                  {role.name}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  {role.description}
                </p>
              </div>

              {/* FOOTER */}

              <div
                className="
                  mt-6
                  pt-4
                  border-t
                  flex items-center justify-between
                "
              >
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Users size={16} />

                  Role ID:
                  {role.roleId}
                </div>

                {/* <button
                  onClick={() =>
                    navigate(
                      `/access/role-permissions/${role.roleId}`
                    )
                  }
                  className="
                    text-sm
                    text-blue-600
                    font-semibold
                    hover:underline
                  "
                >
                  Manage Access
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===================================== */}
      {/* EMPTY */}
      {/* ===================================== */}

      {!loading &&
        filteredRoles.length === 0 && (
          <div
            className="
              bg-white
              rounded-3xl
              shadow-lg
              p-20
              text-center
            "
          >
            <Shield
              size={60}
              className="
                mx-auto
                text-gray-300
              "
            />

            <h2 className="mt-4 text-xl font-bold text-gray-700">
              No Roles Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing search keyword
            </p>
          </div>
        )}
    </div>
  );
}