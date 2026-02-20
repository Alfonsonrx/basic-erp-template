"use client";

// import * as React from "react";
import type { TaskItem, TasksColumn } from "@types";
import KanbanColumn from "./KanbanColumn";
import { useState, type DragEvent } from "react";
import { dummyProjectColumns } from "@/dummyData/projects";

export function KanbanBoard() {
  const [kanbanInfo, setKanbanInfo] = useState<TasksColumn[]>(dummyProjectColumns);

  const [columns, setColumns] = useState<TasksColumn[]>(kanbanInfo);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);

  const handleDragStart = (e: DragEvent, taskId: number | null) => {
    if (taskId) {
      setDraggedTaskId(taskId);
      e.dataTransfer.effectAllowed = "move";
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (columnId: string) => {
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: DragEvent, targetColumnId: string) => {
    e.preventDefault();
    setDragOverColumn(null);

    if (!draggedTaskId) return;

    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((col) => ({
        ...col,
        tasks: [...col.tasks],
      }));

      // Find source column and task
      let task: TaskItem | undefined;

      for (let i = 0; i < newColumns.length; i++) {
        let sourceColumnIndex = -1;
        const taskIndex = newColumns[i].tasks.findIndex(
          (t) => t.id === draggedTaskId,
        );
        if (taskIndex !== -1) {
          task = newColumns[i].tasks[taskIndex];
          sourceColumnIndex = i;
          newColumns[i].tasks.splice(taskIndex, 1);
          break;
        }
      }

      // Add to target column
      if (task) {
        const targetColumnIndex = newColumns.findIndex(
          (col) => col.id === targetColumnId,
        );
        if (targetColumnIndex !== -1) {
          newColumns[targetColumnIndex].tasks.push(task);
        }
      }

      return newColumns;
    });

    setDraggedTaskId(null);
  };

  return (
    <div className="grid grid-cols-4 gap-4 overflow-x-auto p-6">
      {columns.map((column) => (
        <div
          key={column.id}
          onDragEnter={() => handleDragEnter(column.id)}
          onDragLeave={handleDragLeave}
        >
          <KanbanColumn
            column={column}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            isDragOver={dragOverColumn === column.id}
          />
        </div>
      ))}
    </div>
  );
}
