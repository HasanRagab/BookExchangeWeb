import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "./layouts/base";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Signup";

// Lazy-load heavy components
const LandingPage = lazy(() => import("@/pages/Landing"));
const BooksPage = lazy(() => import("./pages/Books"));
const BookDetailsPage = lazy(() => import("./pages/BookDetails"));
const ReaderDashboard = lazy(() => import("./pages/ReaderDashboard"));
const BookOwnerDashboard = lazy(() => import("./pages/BookOwnerDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LandingPage />
          </Suspense>
        ),
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
            <Suspense fallback={<div>Loading...</div>}>
              <BooksPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: ":id",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <BookDetailsPage />
            </Suspense>
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
            <Suspense fallback={<div>Loading...</div>}>
              <ReaderDashboard />
            </Suspense>
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
            <Suspense fallback={<div>Loading...</div>}>
              <BookOwnerDashboard />
            </Suspense>
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
            <Suspense fallback={<div>Loading...</div>}>
              <AdminDashboard />
            </Suspense>
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