import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { IconButton } from "@components/Buttons";
import type { TaskItem } from "@types";

import TaskEditModal from "./TaskEditModal";

type Props = {
  task: TaskItem;
  onDragStart: (e: React.DragEvent, taskId: number | null) => void;
};

function TaskCard({ task, onDragStart }: Props) {
  // Modal state
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDetailModal = (task: TaskItem) => {

    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="group cursor-grab rounded-lg bg-border/60 p-3 transition-all hover:bg-border active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-md font-medium text-foreground">{task.title}</h3>
        <IconButton
          size={8}
          icon={MoreHorizontal}
          onClick={() => openDetailModal(task)}
          className="p-1 size-8 opacity-0 transition-opacity group-hover:opacity-100 text-foreground hover:text-primary-foreground hover:bg-muted-foreground!"
        />
      </div>
      {/* <span className="text-sm">Deadline: {task.deadline}</span> */}
      <p className="mt-1 text-sm text-muted">Deadline: {task.deadline}</p>

      {/* Modal */}
      <TaskEditModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask ?? undefined}
      />
    </div>
  );
}

export default TaskCard;
