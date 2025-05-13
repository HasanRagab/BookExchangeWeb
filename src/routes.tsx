import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Signup";
import BookDetailsPage from "./pages/BookDetails";
import BooksPage from "./pages/Books";
import LandingPage from "@/pages/Landing";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminDashboard from "./pages/AdminPage";
import Layout from "./layouts/base";
import BookOwnerDashboard from "./pages/BookOwnerDashboard";
import ReaderDashboard from "./pages/ReaderDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "books",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <BooksPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ":id",
        element: (
          <ProtectedRoute>
            <BookDetailsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "my-library",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute role="Reader">
            <ReaderDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "my-books",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute role="BookOwner">
            <BookOwnerDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "admin",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute role="Admin">
            <AdminDashboard />
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
