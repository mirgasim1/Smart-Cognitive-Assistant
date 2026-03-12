import React, { createContext, useContext, useState, useCallback } from "react";
import { Task, FocusSession, Priority } from "@/types/task";
import { INITIAL_TASKS, INITIAL_SESSIONS } from "@/data/initialData";

interface TaskContextType {
  tasks: Task[];
  sessions: FocusSession[];
  addTask: (task: Omit<Task, "id" | "createdAt" | "completed">) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addSession: (session: Omit<FocusSession, "id">) => void;
  searchTasks: (query: string) => Task[];
}

const TaskContext = createContext<TaskContextType | null>(null);

export const useTaskContext = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTaskContext must be used within TaskProvider");
  return ctx;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [sessions, setSessions] = useState<FocusSession[]>(INITIAL_SESSIONS);

  const addTask = useCallback((task: Omit<Task, "id" | "createdAt" | "completed">) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addSession = useCallback((session: Omit<FocusSession, "id">) => {
    setSessions((prev) => [{ ...session, id: crypto.randomUUID() }, ...prev]);
  }, []);

  const searchTasks = useCallback(
    (query: string) => {
      const q = query.toLowerCase();
      return tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.id.includes(q)
      );
    },
    [tasks]
  );

  return (
    <TaskContext.Provider
      value={{ tasks, sessions, addTask, toggleTask, deleteTask, addSession, searchTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};
