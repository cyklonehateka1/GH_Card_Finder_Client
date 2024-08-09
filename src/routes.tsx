import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./components/UserLayout";
import Home from "./pages/home/Home";
import Login from "./pages/admin-login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminDashboardLayouts from "./components/AdminDashboardLayouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboardLayouts />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
