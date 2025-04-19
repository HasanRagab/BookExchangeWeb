// routes.js
import { Navigate, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Progress } from "@/components/ui/progress";

// Lazy loaded components - Public pages
const Home = lazy(() => import("./pages/demo/Home"));
const BookBrowse = lazy(() => import("./pages/BookBrowse"));
const BookSearch = lazy(() => import("./pages/BookSearch"));
const Login = lazy(() => import("./pages/demo/Login"));
const BookDetails = lazy(() => import("./pages/BookDetails"));
// const Register = lazy(() => import("./pages/Register"));
// const NotFound = lazy(() => import("./pages/NotFound"));

// // Lazy loaded components - User pages
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const Profile = lazy(() => import("./pages/Profile"));
// const MyBorrows = lazy(() => import("./pages/MyBorrows"));
// const MyRequests = lazy(() => import("./pages/MyRequests"));

// // Lazy loaded components - Owner pages
// const MyBooks = lazy(() => import("./pages/MyBooks"));
// const AddBook = lazy(() => import("./pages/AddBook"));
// const EditBook = lazy(() => import("./pages/EditBook"));
// const BorrowRequests = lazy(() => import("./pages/BorrowRequests"));

// // Lazy loaded components - Admin pages
// const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
// const AdminUsers = lazy(() => import("./pages/AdminUsers"));
// const AdminBooks = lazy(() => import("./pages/AdminBooks"));

// Layouts
// const MainLayout = lazy(() => import("./layouts/MainLayout"));
// const UserLayout = lazy(() => import("./layouts/UserLayout"));
// const AdminLayout = lazy(() => import("./layouts/AdminLayout"));

export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = false;
  return isAuthenticated ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
};

export const AdminOnlyRoute = ({ children }: { children: React.ReactElement }) => {
  const isAdmin = true;
  return isAdmin ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

export const ProtectedLayout = () => {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = false;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
};


const withSuspense = (Component: React.ComponentType) => {
  return (
    <Suspense fallback={<Progress />}>
      <Component />
    </Suspense>
  );
};

// Routes configuration
const routes = [
  {
    path: "/",
    // element: withSuspense(MainLayout),
    children: [
      {
        index: true,
        element: withSuspense(Home),
      },
      {
        path: "books",
        children: [
          {
            index: true,
            element: withSuspense(BookBrowse),
          },
          {
            path: "search",
            element: withSuspense(BookSearch),
          },
          {
            path: ":id",
            element: withSuspense(BookDetails),
          },
        ],
      },
      {
        path: "login",
        element: withSuspense(Login),
      },
      // {
      //   path: "register",
      //   element: withSuspense(Register),
      // },
      // {
      //   path: "*",
      //   element: withSuspense(NotFound),
      // },
    ],
  },
  // {
  //   path: "/",
  //   element: withSuspense(UserLayout),
  //   children: [
  //     {
  //       path: "dashboard",
  //       element: <ProtectedLayout />,
  //       children: [
  //         {
  //           index: true,
  //           element: withSuspense(Dashboard),
  //         },
  //       ],
  //     },
  //     {
  //       path: "profile",
  //       element: <ProtectedLayout />,
  //       children: [
  //         {
  //           index: true,
  //           element: withSuspense(Profile),
  //         },
  //       ],
  //     },
  //     {
  //       path: "my-borrows",
  //       element: <ProtectedLayout />,
  //       children: [
  //         {
  //           index: true,
  //           element: withSuspense(MyBorrows),
  //         },
  //       ],
  //     },
  //     {
  //       path: "my-requests",
  //       element: <ProtectedLayout />,
  //       children: [
  //         {
  //           index: true,
  //           element: withSuspense(MyRequests),
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   path: "/",
  //   children: [
  //     {
  //       path: "my-books",
  //       children: [
  //         {
  //           index: true,
  //           element: withSuspense(MyBooks),
  //         },
  //         {
  //           path: "new",
  //           element: withSuspense(AddBook),
  //         },
  //         {
  //           path: ":id/edit",
  //           element: withSuspense(EditBook),
  //         },
  //       ],
  //     },
  //     {
  //       path: "borrow-requests",
  //       element: withSuspense(BorrowRequests),
  //     },
  //   ],
  // },
  // // Admin routes
  // {
  //   path: "admin",
  //   children: [
  //     {
  //       index: true,
  //       element: withSuspense(AdminDashboard),
  //     },
  //     {
  //       path: "dashboard",
  //       element: withSuspense(AdminDashboard),
  //     },
  //     {
  //       path: "users",
  //       element: withSuspense(AdminUsers),
  //     },
  //     {
  //       path: "books",
  //       element: withSuspense(AdminBooks),
  //     },
  //   ],
  // },
];

export default routes;