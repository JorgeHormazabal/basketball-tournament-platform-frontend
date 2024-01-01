import { useAuthStore } from "hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const { startLogout } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    startLogout();
    navigate("/");
  }, [navigate]);
  return;
}
