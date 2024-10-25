import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DashboardStats from "@/components/DashboardStats";
import { Mail, Users, BarChart2 } from "lucide-react";

const Index = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Bem-vindo ao MarketFlow</h1>
          <p className="text-gray-600">Gerencie suas campanhas de marketing em um só lugar</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          Nova Campanha
        </Button>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="dashboard-card">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Campanhas Ativas</h3>
          </div>
          <p className="text-3xl font-bold mb-2">12</p>
          <p className="text-sm text-gray-500">3 campanhas agendadas</p>
        </Card>

        <Card className="dashboard-card">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-secondary/10">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold">Leads do Mês</h3>
          </div>
          <p className="text-3xl font-bold mb-2">256</p>
          <p className="text-sm text-gray-500">+12% em relação ao mês anterior</p>
        </Card>

        <Card className="dashboard-card">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <BarChart2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Taxa de Conversão</h3>
          </div>
          <p className="text-3xl font-bold mb-2">8.5%</p>
          <p className="text-sm text-gray-500">Meta mensal: 10%</p>
        </Card>
      </div>
    </div>
  );
};

export default Index;