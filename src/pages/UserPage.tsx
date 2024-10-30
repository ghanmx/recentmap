import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TowMap from "@/components/TowMap";
import { ServiceSummary } from "@/components/analytics/ServiceSummary";
import { OperatorProfile } from "@/components/user/OperatorProfile";

const UserPage = () => {
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'analytics'>('profile');

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Panel lateral colapsable */}
      <div className={`
        relative bg-white border-r transition-all duration-300
        ${isPanelExpanded ? 'w-[400px]' : 'w-0'}
      `}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-10 top-4 bg-white border shadow-md"
          onClick={() => setIsPanelExpanded(!isPanelExpanded)}
        >
          {isPanelExpanded ? <ChevronLeft /> : <ChevronRight />}
        </Button>

        <div className="p-4 h-full overflow-y-auto">
          <div className="flex gap-2 mb-4">
            <Button
              variant={activeTab === 'profile' ? 'default' : 'outline'}
              onClick={() => setActiveTab('profile')}
            >
              Perfil
            </Button>
            <Button
              variant={activeTab === 'analytics' ? 'default' : 'outline'}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </Button>
          </div>

          {activeTab === 'profile' ? (
            <OperatorProfile />
          ) : (
            <ServiceSummary />
          )}
        </div>
      </div>

      {/* Mapa */}
      <div className="flex-1">
        <TowMap />
      </div>
    </div>
  );
};

export default UserPage;