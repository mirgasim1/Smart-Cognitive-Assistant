import { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const SearchPage = () => {
  const { searchTasks } = useTaskContext();
  const [query, setQuery] = useState("");

  const results = query.trim() ? searchTasks(query) : [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Search Tasks</h2>

      <div className="relative max-w-lg mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Search by title, description, or ID..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {query.trim() && results.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            Task not found.
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {results.map((task) => (
          <Card key={task.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-xs text-muted-foreground">{task.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={task.completed ? "default" : "secondary"}>
                  {task.completed ? "Completed" : "Pending"}
                </Badge>
                <span className="text-xs font-mono text-muted-foreground">
                  {new Date(task.deadline).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
