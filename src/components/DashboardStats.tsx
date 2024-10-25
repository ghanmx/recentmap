import { ArrowUpRight, ArrowDownRight, Users, Mail, MousePointerClick, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Total de Leads",
    value: "1,234",
    change: "+12.3%",
    isPositive: true,
    icon: Users,
  },
  {
    label: "Taxa de Abertura",
    value: "45.6%",
    change: "+5.2%",
    isPositive: true,
    icon: Mail,
  },
  {
    label: "Taxa de Cliques",
    value: "12.3%",
    change: "-2.1%",
    isPositive: false,
    icon: MousePointerClick,
  },
  {
    label: "Conversões",
    value: "234",
    change: "+8.4%",
    isPositive: true,
    icon: Target,
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between">
              <Icon className="w-6 h-6 text-primary" />
              <span
                className={cn(
                  "flex items-center text-sm",
                  stat.isPositive ? "text-secondary" : "text-destructive"
                )}
              >
                {stat.change}
                {stat.isPositive ? (
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 ml-1" />
                )}
              </span>
            </div>
            <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;