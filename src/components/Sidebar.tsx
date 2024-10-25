import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Mail, 
  Users, 
  BarChart2, 
  Calendar,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Mail, label: "Campanhas", path: "/campaigns" },
  { icon: Users, label: "Leads", path: "/leads" },
  { icon: BarChart2, label: "Análises", path: "/analytics" },
  { icon: Calendar, label: "Agendamentos", path: "/schedule" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen w-64 bg-white border-r">
      <div className="p-6">
        <h1 className="text-2xl font-heading font-bold text-primary">MarketFlow</h1>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors",
                    location.pathname === item.path && "bg-primary/10 text-primary font-medium"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-5 h-5" />
          Configurações
        </Link>
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors w-full">
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;