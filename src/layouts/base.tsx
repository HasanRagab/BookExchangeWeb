import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import useAuthStore from "@/store/authStore";

export default function Layout() {
    const { user, logout } = useAuthStore();
    return (
        <div className="min-h-screen flex flex-col">
            {user && (
                <div className="fixed top-0 right-0 z-50 p-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">{user.firstName.slice(0, 1)}</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">User Info</h2>
                                <p className="mt-2">Name: {user.firstName}</p>
                                <p>Email: {user.email}</p>
                                <p>Role: {user.role}</p>
                                {["Admin", "BookOwner", "Reader"].includes(user.role) && (
                                    <Link
                                        to={
                                            user.role === "Admin"
                                                ? "/admin"
                                                : user.role === "BookOwner"
                                                ? "/my-books"
                                                : "/my-library"
                                        }
                                        className="block mt-2 text-blue-500"
                                    >
                                        {user.role === "Admin"
                                            ? "Admin Dashboard"
                                            : user.role === "BookOwner"
                                            ? "My Books"
                                            : "My Library"}
                                    </Link>
                                )}
                            </div>
                            <div className="flex justify-end p-2 border-t">
                                <Button variant="destructive" onClick={logout}>
                                    Logout
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            )}

            <main className="flex-1 px-4">
                <Outlet />
            </main>
        </div>
    );
}
