import { storage } from "@/utils/storage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    if (storage.getToken()) {
      navigate("main");
    } else {
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Hoşgeldiniz</h1>
    </div>
  );
}
