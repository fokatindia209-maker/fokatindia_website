import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import type { AppDispatch } from "../store/store";

export default function DocumentUnderReview() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">

                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Documents Under Review
                </h2>

                <p className="text-gray-600 mb-2">
                    Your documents have been submitted successfully and are currently being reviewed by our team.
                </p>

                <p className="text-gray-500 text-sm mb-6">
                    Once your documents are verified, you will receive a confirmation on your registered email address. This process typically takes 1–2 business days.
                </p>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-left">
                    <p className="text-yellow-800 text-sm font-semibold mb-1">What happens next?</p>
                    <ul className="text-yellow-700 text-sm space-y-1 list-disc list-inside">
                        <li>Admin team reviews your uploaded documents</li>
                        <li>You will be notified via email upon approval or rejection</li>
                        <li>If rejected, you can re-upload the required documents</li>
                    </ul>
                </div>

                <button
                    onClick={handleLogout}
                    className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
}
