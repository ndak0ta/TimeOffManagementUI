import { Navigate, Route, Routes } from "react-router-dom";
import { lazyImport } from "@utils/lazyImport";
import { ReactElement } from "react";
import { storage } from "@utils/storage";

const { Login } = lazyImport(() => import("@features/auth/routes"), "Login");
const { MainPage } = lazyImport(() => import("@features/misc"), "MainPage");
const { UserProfile } = lazyImport(
  () => import("@features/users"),
  "UserProfile"
);
const { Users } = lazyImport(() => import("@features/users"), "Users");

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<h1>404</h1>} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <MainPage />
          </RequireAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <UserProfile />
          </RequireAuth>
        }
      />
      <Route
        path="/users"
        element={
          <RequireAuth>
            <Users />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

const RequireAuth = ({ children }: { children: ReactElement }) => {
  if (!storage.getToken()) {
    return <Navigate to="/login" />;
  }

  return children;
};
