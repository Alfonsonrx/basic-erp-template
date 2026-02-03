"use client";

// import * as React from "react";
import type { Column, TaskItem } from "@types";
import KanbanColumn from "./KanbanColumn";
import { useState, type DragEvent } from "react";
import { dummyProjectColumns } from "@/dummyData/projects";

// const initialProjectColumns: Column[] = [
//   {
//     id: "todo",
//     title: "To Do",
//     tasks: [
//       {
//         id: 1,
//         title: "Combinatorics and validity",
//         status: "todo",
//         deadline: "2026-01-11",
//       },
//       {
//         id: 2,
//         title: "Hypothesis Testing",
//         status: "todo",
//         deadline: "2026-01-11",
//       },
//       {
//         id: 3,
//         title: "Time Series Analysis",
//         status: "todo",
//         deadline: "2026-01-11",
//       },
//       {
//         id: 4,
//         title: "Clustering Algorithms",
//         status: "todo",
//         deadline: "2026-01-11",
//       },
//     ],
//   },
//   {
//     id: "in-progress",
//     title: "In Progress",
//     tasks: [
//       {
//         id: 5,
//         title: "A/B Testing: Designing and Analyzing Experiments",
//         status: "inprogress",
//         deadline: "2026-01-11",
//       },
//       {
//         id: 6,
//         title: "Data Visualization",
//         status: "inprogress",
//         deadline: "2026-01-11",
//       },
//     ],
//   },
//   {
//     id: "approval",
//     title: "Approval",
//     icon: <Clock className="size-5 text-amber-500" />,
//     tasks: [
//       {
//         id: 7,
//         title: "Principal Component Analysis",
//         status: "approval",
//         deadline: "2026-01-11",
//       },
//       {
//         id: 8,
//         title: "Linear, Logistic, and Poisson Regression",
//         status: "approval",
//         deadline: "2026-01-11",
//       },
//       {
//         id: 9,
//         title: "One-Sample Test",
//         status: "approval",
//         deadline: "2026-01-11",
//       },
//     ],
//   },
//   {
//     id: "completed",
//     title: "Completed",
//     icon: <CheckCircle2 className="size-5 text-teal-500" />,
//     tasks: [
//       {
//         id: 10,
//         title: "Exponential Smoothing",
//         status: "done",
//         deadline: "2026-01-11",
//       },
//       {
//         id: 11,
//         title: "Real-world Dataset",
//         status: "done",
//         deadline: "2026-01-11",
//       },
//       {
//         id: 12,
//         title: "Support Vector Machines",
//         status: "done",
//         deadline: "2026-01-11",
//       },
//     ],
//   },
// ];

export function KanbanBoard() {
  const [kanbanInfo, setKanbanInfo] = useState<Column[]>(dummyProjectColumns);

  const [columns, setColumns] = useState<Column[]>(kanbanInfo);
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
