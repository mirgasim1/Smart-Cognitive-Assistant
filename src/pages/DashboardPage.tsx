import { useTaskContext } from "@/context/TaskContext";
import { CheckCircle2, Clock, ListTodo, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const DashboardPage = () => {
  const { tasks, sessions } = useTaskContext();

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalFocusMinutes = Math.round(
    sessions.reduce((acc, s) => acc + s.duration, 0) / 60
  );
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const rate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const stats = [
    { label: "Total Tasks", value: tasks.length, icon: ListTodo, color: "text-primary" },
    { label: "Completed", value: completedCount, icon: CheckCircle2, color: "text-success" },
    { label: "Pending", value: pendingCount, icon: Clock, color: "text-warning" },
    { label: "Focus Time", value: `${totalFocusMinutes}m`, icon: TrendingUp, color: "text-accent" },
  ];

  const upcoming = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 5);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <s.icon className={`${s.color} shrink-0`} size={28} />
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-3">Upcoming Deadlines</h3>
      {upcoming.length === 0 ? (
        <p className="text-muted-foreground text-sm">No pending tasks.</p>
      ) : (
        <div className="space-y-2">
          {upcoming.map((t) => (
            <Card key={t.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.description}</p>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {new Date(t.deadline).toLocaleDateString()}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 rounded-lg bg-secondary text-sm text-muted-foreground">
        Completion rate: <span className="font-bold text-foreground">{rate}%</span>
      </div>
    </div>
  );
};

export default DashboardPage;
