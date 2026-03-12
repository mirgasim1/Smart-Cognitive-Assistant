import { useState, useEffect, useRef } from "react";
import { useTaskContext } from "@/context/TaskContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, RotateCcw, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const PRESETS = [
  { label: "25 min", seconds: 1500 },
  { label: "15 min", seconds: 900 },
  { label: "45 min", seconds: 2700 },
];

const FocusPage = () => {
  const { tasks, addSession } = useTaskContext();
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [duration, setDuration] = useState(1500);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeTasks = tasks.filter((t) => !t.completed);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && running) {
      setRunning(false);
      const elapsed = duration;
      addSession({
        taskId: selectedTaskId,
        duration: elapsed,
        date: new Date().toISOString(),
      });
      toast.success(`Focus session completed! ${Math.round(elapsed / 60)} min recorded.`);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, timeLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const reset = () => {
    setRunning(false);
    setTimeLeft(duration);
  };

  const selectPreset = (seconds: number) => {
    setDuration(seconds);
    setTimeLeft(seconds);
    setRunning(false);
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Focus Session</h2>

      <div className="max-w-md mx-auto">
        <Card>
          <CardContent className="p-8 flex flex-col items-center gap-6">
            {/* Timer circle */}
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="44"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="6"
                />
                <circle
                  cx="50" cy="50" r="44"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 44}`}
                  strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold font-mono">{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Presets */}
            <div className="flex gap-2">
              {PRESETS.map((p) => (
                <Button
                  key={p.seconds}
                  variant={duration === p.seconds ? "default" : "secondary"}
                  size="sm"
                  onClick={() => selectPreset(p.seconds)}
                  disabled={running}
                >
                  {p.label}
                </Button>
              ))}
            </div>

            {/* Task selector */}
            <Select value={selectedTaskId} onValueChange={setSelectedTaskId}>
              <SelectTrigger>
                <SelectValue placeholder="Link to a task (optional)" />
              </SelectTrigger>
              <SelectContent>
                {activeTasks.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Controls */}
            <div className="flex gap-3">
              <Button onClick={() => setRunning(!running)} size="lg">
                {running ? <Pause size={20} /> : <Play size={20} />}
                <span className="ml-2">{running ? "Pause" : "Start"}</span>
              </Button>
              <Button variant="outline" size="lg" onClick={reset}>
                <RotateCcw size={20} />
              </Button>
            </div>

            {timeLeft === 0 && (
              <div className="flex items-center gap-2 text-success text-sm font-medium">
                <CheckCircle2 size={16} />
                Session saved!
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FocusPage;
