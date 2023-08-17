import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import Layout from "../components/Layout";

export default function Login() {
  const navigate = useNavigate();

  return (
    <Layout title="Giriş yap">
      <LoginForm onSuccess={() => navigate("/main")} />
    </Layout>
  );
}
