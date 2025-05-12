import { RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import router from "./routes";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const App = () => {
  const { user, me, isLoading } = useAuthStore();
  useEffect(() => {
    if (!user) {
      me();
    }
  }, [user, me]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};

export default App;