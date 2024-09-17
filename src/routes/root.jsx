import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Welcome from "../pages/Welcome";
import ChatPage from "../pages/ChatPage";
import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "../components/PublicRoute";
import ProtectedRoute from "../components/ProtectedRoute";
import AppPageLayout from "../layout/AppPageLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute element={<Welcome />} />,
  },
  {
    path: "/login",
    element: <PublicRoute element={<Login />} />,
  },
  {
    path: "/register",
    element: <PublicRoute element={<Register />} />,
  },
  {
    path: "/app",
    // eslint-disable-next-line react/no-children-prop
    element: <ProtectedRoute children={<AppPageLayout />} />,

    children: [
      {
        // path: "",
        index: true,
        element: <Home />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
    ],
  },
]);

export default router;
