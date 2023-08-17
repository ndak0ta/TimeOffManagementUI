import DashboardLayout from "@/components/DashboardLayout";
import { lazyImport } from "@/utils/lazyImport";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const { MainPage } = lazyImport(() => import("@/features/misc"), "MainPage");
const { UserProfile } = lazyImport(
  () => import("@/features/users"),
  "UserProfile"
);

// TODO loading component
const App = () => {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  );
};

export const protectedRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "main",
        element: <MainPage />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
    ],
  },
];
