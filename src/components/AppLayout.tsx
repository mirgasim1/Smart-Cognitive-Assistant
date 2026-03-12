import { Outlet } from "react-router-dom";
import AppNavLink from "@/components/AppNavLink";
import { LayoutDashboard, ListTodo, Timer, BarChart3, Search } from "lucide-react";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card p-6 flex flex-col gap-2 shrink-0">
        <div className="mb-6">
          <h1 className="text-lg font-bold tracking-tight">
            <span className="text-primary">Smart</span> Task Manager
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">Cognitive productivity tool</p>
        </div>
        <nav className="flex flex-col gap-1">
          <AppNavLink to="/" icon={LayoutDashboard} label="Dashboard" />
          <AppNavLink to="/tasks" icon={ListTodo} label="Tasks" />
          <AppNavLink to="/focus" icon={Timer} label="Focus Session" />
          <AppNavLink to="/analytics" icon={BarChart3} label="Analytics" />
          <AppNavLink to="/search" icon={Search} label="Search" />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
