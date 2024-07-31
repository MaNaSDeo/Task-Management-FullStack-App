"use client";

import { ReactNode } from "react";
import { TaskProvider } from "@/contexts/TaskContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <TaskProvider>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      </TaskProvider>
    </AuthProvider>
  );
}
