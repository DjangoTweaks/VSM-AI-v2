import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, UserCheck, Phone, Shield, BarChart3, AlertTriangle, Bell, Settings, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/users", icon: Users, label: "Users" },
  { to: "/customers", icon: UserCheck, label: "Customers" },
  { to: "/calls", icon: Phone, label: "Calls" },
  { to: "/verification", icon: Shield, label: "Verification" },
  { to: "/scoring", icon: BarChart3, label: "Scoring" },
];

const DashboardLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-56 bg-card border-r border-border flex flex-col fixed h-full">
        <div className="p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-foreground flex items-center justify-center">
            <span className="text-primary-foreground text-[10px] font-bold">VSM.ai</span>
          </div>
          <div>
            <div className="font-bold text-sm text-foreground">VSM.ai</div>
            <div className="text-[11px] text-muted-foreground">Admin Dashboard</div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 mt-auto">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <Users className="w-4 h-4" />
            + Create New User
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-56">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-card border-b border-border px-6 py-3 flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Global search..." className="pl-9 h-9 bg-muted/50" />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground">
              <Settings className="w-5 h-5" />
            </button>
            <Avatar className="w-9 h-9 border-2 border-warning">
              <AvatarFallback className="bg-warning/20 text-warning font-semibold text-sm">MC</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
