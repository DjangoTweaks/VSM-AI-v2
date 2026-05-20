import { useState } from "react";
import { Search, Pencil, UserX, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const users = [
  { name: "Jane Doe", email: "jane.doe@vsm.ai", role: "Manager", status: "Active", initials: "JD", color: "bg-primary/10 text-primary" },
  { name: "Alex Smith", email: "alex.smith@vsm.ai", role: "Agent", status: "Active", initials: "AS", color: "bg-muted text-muted-foreground" },
  { name: "Robert King", email: "r.king@vsm.ai", role: "Agent", status: "Inactive", initials: "RK", color: "bg-warning/10 text-warning" },
  { name: "Sarah Miller", email: "s.miller@vsm.ai", role: "Manager", status: "Active", initials: "SM", color: "bg-accent text-accent-foreground" },
];

const tabs = ["All Users", "Agents", "Managers"];

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("All Users");
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) => {
    if (activeTab === "Agents" && u.role !== "Agent") return false;
    if (activeTab === "Managers" && u.role !== "Manager") return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground">Manage agents and managers for your organization</p>
        </div>
        <button className="bg-card border border-primary text-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-primary/5">
          <UserPlus className="w-4 h-4" /> Add New Member
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-border mb-4">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search users by name, email or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="vsm-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Name</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Email</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Role</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
              <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.email} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={`text-xs font-semibold ${u.color}`}>{u.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">{u.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground">{u.email}</td>
                <td className="px-5 py-4">
                  <span className={u.role === "Manager" ? "vsm-badge-manager" : "vsm-badge-agent"}>{u.role}</span>
                </td>
                <td className="px-5 py-4">
                  <span className={u.status === "Active" ? "vsm-status-active" : "vsm-status-inactive"}>
                    <span className={`w-2 h-2 rounded-full ${u.status === "Active" ? "bg-success" : "bg-muted-foreground/40"}`} />
                    {u.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 rounded hover:bg-accent text-muted-foreground"><Pencil className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded hover:bg-accent text-muted-foreground"><UserX className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing <span className="font-semibold text-foreground">1-{filtered.length}</span> of 24 users</span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-accent">&lt;</button>
            <button className="w-8 h-8 rounded flex items-center justify-center bg-primary text-primary-foreground font-semibold">1</button>
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-accent">2</button>
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-accent">3</button>
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-accent">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
