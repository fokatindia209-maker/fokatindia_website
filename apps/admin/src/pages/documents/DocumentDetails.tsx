import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function DocumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState<any>(null);

  const fetchDoc = async () => {
    const res = await api.get(`/restful/v1/api/documents/${id}`);

    setDoc(res.data?.data);
  };

  useEffect(() => {
    fetchDoc();
  }, [id]);

  const handleVerify = async () => {
    await api.put(`/restful/v1/api/documents/${id}/verify`, null, {
      params: { status: "APPROVED" },
    });
    navigate(-1);
  };

  const handleReject = async () => {
    await api.put(`/restful/v1/api/documents/${id}/verify`, null, {
      params: { status: "REJECTED" },
    });
    navigate(-1);
  };

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
        <button
          onClick={handleVerify}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Verify
        </button>

        <button
          onClick={handleReject}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
