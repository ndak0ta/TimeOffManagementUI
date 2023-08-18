import DashboardLayout from "@components/DashboardLayout";
import { UserList } from "@features/users/components/UserList";
import { AuthLoader } from "@lib/auth";
import { lazyImport } from "@utils/lazyImport";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const { MainPage } = lazyImport(() => import("@features/misc"), "MainPage");
const { UserProfile } = lazyImport(
  () => import("@features/users"),
  "UserProfile"
);

// TODO loading component
const App = () => {
  return (
    <AuthLoader
      renderLoading={() => <div>Loading...</div>}
      renderUnauthenticated={() => <div>Yetkisiz !şlem!</div>}
    >
      <DashboardLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    </AuthLoader>
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
      {
        path: "users",
        element: <UserList />,
      }
    ],
  },
];
