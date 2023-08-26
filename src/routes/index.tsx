import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { useRoutes } from "react-router-dom";
import { useUser } from "@lib/auth";

export const AppRoutes = () => {
  const user = useUser();

  const commonRoutes = [
    {
      path: "*",
      element: <h1>404</h1>,
    },
  ];

  const routes = user.data ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
