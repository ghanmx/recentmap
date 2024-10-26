import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon, X, HelpCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const TopNavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-2 flex justify-between items-center">
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/90 hover:bg-white/95 border border-gray-200 shadow-sm 
                     transition-all duration-300 hover:shadow active:scale-95"
          >
            {isMenuOpen ? (
              <X className="w-4 h-4 mr-2" />
            ) : (
              <MenuIcon className="w-4 h-4 mr-2" />
            )}
            Menu
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 animate-in fade-in-50 zoom-in-95">
          <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">History</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Help</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2"
            onClick={() => window.open('/help', '_blank')}
          >
            <HelpCircle className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Need help?</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};