import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const TopNavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-2">
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400 
                       border border-slate-300 shadow-lg transition-all duration-300 
                       hover:shadow-xl active:scale-95 animate-in fade-in-50"
          >
            {isMenuOpen ? (
              <X className="w-4 h-4 mr-2" />
            ) : (
              <MenuIcon className="w-4 h-4 mr-2" />
            )}
            Menu
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 animate-in fade-in-50 zoom-in-95">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>History</DropdownMenuItem>
          <DropdownMenuItem>Help</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};