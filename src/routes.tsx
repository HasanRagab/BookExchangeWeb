import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/demo/Login";
import SignupPage from "@/pages/demo/Signup";
import ExplorePage from "@/pages/BookBrowse";
import ProtectedRoute from "@/components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "explore",
        element: (
          <ProtectedRoute>
            <ExplorePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

export default router;
