import { Task, FocusSession } from "@/types/task";

export const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Finish Math Homework",
    description: "Complete exercises 1-20 from Chapter 5",
    priority: "high",
    deadline: new Date(Date.now() + 86400000).toISOString(),
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Read History Chapter",
    description: "Read and take notes on Chapter 12",
    priority: "medium",
    deadline: new Date(Date.now() + 172800000).toISOString(),
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Write Essay Draft",
    description: "First draft of the literature essay",
    priority: "high",
    deadline: new Date(Date.now() + 259200000).toISOString(),
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const INITIAL_SESSIONS: FocusSession[] = [
  {
    id: "1",
    taskId: "1",
    duration: 1500,
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "2",
    taskId: "2",
    duration: 2400,
    date: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "3",
    taskId: "3",
    duration: 1800,
    date: new Date().toISOString(),
  },
];
