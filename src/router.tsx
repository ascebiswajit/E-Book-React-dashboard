import {
    createBrowserRouter,
  } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import  Dashboard  from "@/pages/Dashboard";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard/>,
    },
    {
        path: "/login",
        element: <LoginPage/>,
      },
      {
        path: "/register",
        element: <RegisterPage/>,
      },
  ]);
  
  export default router