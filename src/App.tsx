import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardMain from "./pages/DashboardMain";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import ErrorPage from "./pages/ErrorPage";
import DashboardProfile from "./pages/DashboardProfile";
import LoginPage from "./pages/LoginPage";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardMain />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/profile",
      element: <DashboardProfile />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}
