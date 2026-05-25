import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import type { AppDispatch } from "../store/store";

export default function Navbar() {

    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const handleLogout = () => {

        dispatch(logout());

        navigate("/");
    };

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px",
                background: "#1976d2",
                color: "white"
            }}
        >

            <h2>Dashboard</h2>

            <button onClick={handleLogout}>
                Logout
            </button>

        </div>
    );
}