import { useTaskContext } from "@/context/TaskContext";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = [
  "hsl(172, 50%, 36%)",
  "hsl(32, 80%, 55%)",
  "hsl(0, 72%, 51%)",
  "hsl(220, 20%, 60%)",
];

const AnalyticsPage = () => {
  const { tasks, sessions } = useTaskContext();

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const totalFocusMinutes = Math.round(sessions.reduce((a, s) => a + s.duration, 0) / 60);
  const avgSession = sessions.length > 0 ? Math.round(totalFocusMinutes / sessions.length) : 0;
  const rate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const hasEnoughData = tasks.length >= 1 && sessions.length >= 1;

  const pieData = [
    { name: "Completed", value: completedCount },
    { name: "Pending", value: pendingCount },
  ];

  const priorityData = [
    { name: "High", count: tasks.filter((t) => t.priority === "high").length },
    { name: "Medium", count: tasks.filter((t) => t.priority === "medium").length },
    { name: "Low", count: tasks.filter((t) => t.priority === "low").length },
  ];

  if (!hasEnoughData) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Analytics</h2>
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            Not enough data for analytics. Create tasks and complete focus sessions first.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Analytics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold">{rate}%</p>
            <p className="text-xs text-muted-foreground">Completion Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold">{totalFocusMinutes}m</p>
            <p className="text-xs text-muted-foreground">Total Focus Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold">{avgSession}m</p>
            <p className="text-xs text-muted-foreground">Avg Session</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold mb-4">Task Status</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold mb-4">Tasks by Priority</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={priorityData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(172, 50%, 36%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
