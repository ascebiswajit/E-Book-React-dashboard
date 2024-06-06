import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardLayouts from "./layouts/DashboardLayouts";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";

const router = createBrowserRouter([
  {
    path: "dashboard",
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "books",
        element: <BookPage/>,
      },
    ],
    element: <DashboardLayouts />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
