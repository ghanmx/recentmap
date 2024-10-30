import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const NavContent = () => (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-heading font-bold text-primary">TowTruck</h1>
      </div>

      <nav className="flex-1 px-4 hidden">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors",
                "bg-primary/10 text-primary font-medium"
              )}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col h-screen w-64 bg-white border-r fixed left-0 top-0">
        <NavContent />
      </div>

      {/* Spacer for content */}
      <div className="hidden lg:block w-64" />
    </>
  );
};

export default Sidebar;