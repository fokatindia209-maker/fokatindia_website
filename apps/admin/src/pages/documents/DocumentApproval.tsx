import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DocumentApproval() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/kyc", { replace: true });
  }, []);

  return null;
}
