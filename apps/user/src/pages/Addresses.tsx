import { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import api from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
interface Address {
  addressId: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
}

export default function Addresses() {
  const navigate = useNavigate();
  const location = useLocation();

  const subVendorId = location.state?.subVendorId;
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    latitude: 0,
    longitude: 0,
    isDefault: false,
  });

  const handleNext = () => {
    if (!selectedAddress) return;

    navigate(`/booking/${subVendorId}`, {
      state: {
        addressId: selectedAddress,
      },
    });
  };

  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/addresses/user/${user.userId}`
      );

      const data = res.data?.data || [];

      setAddresses(data);

      const defaultAddress = data.find(
        (item: Address) => item.isDefault
      );

      if (defaultAddress) {
        setSelectedAddress(defaultAddress.addressId);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const setDefaultAddress = async (addressId: number) => {
    try {
      await api.put(
        `/addresses/${addressId}/default`
      );

      setSelectedAddress(addressId);

      await fetchAddresses();
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  const handleSaveAddress = async () => {
    try {
      await api.post("/addresses", {
        userId: Number(user.userId),
        ...form,
      });

      setShowForm(false);

      setForm({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        latitude: 0,
        longitude: 0,
        isDefault: false,
      });

      await fetchAddresses();
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <UserLayout>
      <div className="space-y-6 py-4 px-4">
        <div className="bg-white rounded-xl shadow p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-xl font-bold">
              Saved Addresses
            </h1>

            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              + Add Address
            </button>
          </div>

          {/* Address List */}
          {loading ? (
            <p className="text-center py-4">
              Loading addresses...
            </p>
          ) : addresses.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No address found
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((address) => (
                <div
                  key={address.addressId}
                  className={`border rounded-lg p-4 transition ${selectedAddress === address.addressId
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200"
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      checked={
                        selectedAddress === address.addressId
                      }
                      onChange={() =>
                        setDefaultAddress(
                          address.addressId
                        )
                      }
                      className="mt-1"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          {address.addressLine1}
                        </p>

                        {address.isDefault && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 text-sm mt-1">
                        {address.addressLine2}
                      </p>

                      <p className="text-gray-600 text-sm">
                        {address.city}, {address.state}
                      </p>

                      <p className="text-gray-600 text-sm">
                        {address.pincode}, {address.country}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Address Form */}
          {showForm && (
            <div className="mt-6 border-t pt-5">
              <h2 className="font-semibold text-lg mb-4">
                Add New Address
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Address Line 1"
                  value={form.addressLine1}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      addressLine1: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

                <input
                  type="text"
                  placeholder="Address Line 2"
                  value={form.addressLine2}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      addressLine2: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

                <input
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      city: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

                <input
                  type="text"
                  placeholder="State"
                  value={form.state}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      state: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

                <input
                  type="text"
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      pincode: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

                <input
                  type="text"
                  placeholder="Country"
                  value={form.country}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      country: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.isDefault}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        isDefault: e.target.checked,
                      })
                    }
                  />
                  Set as default address
                </label>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSaveAddress}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                  >
                    Save Address
                  </button>

                  <button
                    onClick={() => setShowForm(false)}
                    className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <button
              disabled={!selectedAddress}
              onClick={handleNext}
              className={`w-full py-3 rounded-lg font-medium transition ${selectedAddress
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}