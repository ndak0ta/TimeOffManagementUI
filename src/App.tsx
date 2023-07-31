import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./components/dashboard/Profile";
import LoginPage from "./pages/LoginPage";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/profile",
      element: <Profile />,
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
