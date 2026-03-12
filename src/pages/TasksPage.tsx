import { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import { Priority } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const priorityColors: Record<Priority, string> = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-warning text-warning-foreground",
  low: "bg-muted text-muted-foreground",
};

const TasksPage = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTaskContext();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !deadline || !priority) {
      toast.error("Incomplete task information. Please fill title, deadline and priority.");
      return;
    }
    addTask({ title, description, priority, deadline: new Date(deadline).toISOString() });
    toast.success("Task created successfully!");
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDeadline("");
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button onClick={() => setShowForm(!showForm)} size="sm">
          <Plus size={16} className="mr-1" />
          New Task
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardContent className="p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Task title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
              <div className="flex gap-3">
                <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Priority *" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-44"
                />
              </div>
              <Button type="submit">Create Task</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-sm">No tasks yet. Create one!</p>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} className={task.completed ? "opacity-60" : ""}>
              <CardContent className="flex items-center gap-4 p-4">
                <button onClick={() => toggleTask(task.id)} className="shrink-0">
                  {task.completed ? (
                    <CheckCircle2 size={20} className="text-success" />
                  ) : (
                    <Circle size={20} className="text-muted-foreground" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${task.completed ? "line-through" : ""}`}>
                    {task.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{task.description}</p>
                </div>
                <Badge className={priorityColors[task.priority]} variant="secondary">
                  {task.priority}
                </Badge>
                <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                  {new Date(task.deadline).toLocaleDateString()}
                </span>
                <button onClick={() => deleteTask(task.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 size={16} />
                </button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TasksPage;
