import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;
export default function DocumentDetails() {
  const { id } = useParams();
  const [doc, setDoc] = useState<any>(null);

  const fetchDoc = async () => {
    const res = await axios.get(`${API}/restful/v1/api/documents/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setDoc(res.data);
  };

  useEffect(() => {
    fetchDoc();
  }, [id]);

  if (!doc) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Document Details</h1>

      <div className="bg-white shadow rounded p-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500">ID</p>
          <p className="font-semibold">{doc.id}</p>
        </div>

        <div>
          <p className="text-gray-500">Type</p>
          <p className="font-semibold">{doc.entityType}</p>
        </div>

        <div>
          <p className="text-gray-500">Entity ID</p>
          <p className="font-semibold">{doc.entityId}</p>
        </div>

        <div>
          <p className="text-gray-500">Name</p>
          <p className="font-semibold">{doc.name}</p>
        </div>

        <div>
          <p className="text-gray-500">Status</p>
          <p className="font-semibold">{doc.status}</p>
        </div>

        <div>
          <p className="text-gray-500">File</p>
          <a
            href={doc.fileUrl}
            target="_blank"
            className="text-blue-600 underline"
          >
            Open File
          </a>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="px-4 py-2 bg-green-500 text-white rounded">
          Verify
        </button>

        <button className="px-4 py-2 bg-red-500 text-white rounded">
          Reject
        </button>
      </div>
    </div>
  );
}