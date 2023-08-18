import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import Layout from "../components/Layout";
import { useUser } from "@lib/auth";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (user.data) {
      navigate("/main");
    }
  }, [user.data, navigate]);

  return (
    <Layout title="Giriş yap">
      <LoginForm onSuccess={() => navigate("/main")} />
    </Layout>
  );
}
