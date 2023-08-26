import { lazyImport } from "@utils/lazyImport";

const { MainPage } = lazyImport(() => import("@features/misc"), "MainPage");
const { UserProfile } = lazyImport(
  () => import("@features/users"),
  "UserProfile"
);
const { Users } = lazyImport(() => import("@features/users"), "Users");

export const protectedRoutes = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/users",
    element: <Users />,
  },
];
