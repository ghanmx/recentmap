import { createBrowserRouter } from "react-router-dom";
import Landing from "@/pages/Landing";
import Index from "@/pages/Index";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { UserDashboard } from "@/components/user/UserDashboard";
import { AuthGuard } from "@/components/auth/AuthGuard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/map",
    element: <Index />,
  },
  {
    path: "/admin/*",
    element: (
      <AuthGuard requiredRole="admin">
        <AdminPanel />
      </AuthGuard>
    ),
  },
  {
    path: "/user/*",
    element: (
      <AuthGuard>
        <UserDashboard />
      </AuthGuard>
    ),
  },
]);