import { IconButton } from "@components/Buttons";
import type { TaskItem } from "@types";
import { MoreHorizontal } from "lucide-react";

type Props = {
  task: TaskItem;
  onDragStart: (e: React.DragEvent, taskId: number) => void;
};

function TaskCard({ task, onDragStart }: Props) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="group cursor-grab rounded-lg bg-slate-800/60 p-3 transition-all hover:bg-slate-800 active:cursor-grabbing"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-md font-medium text-slate-100">{task.title}</h3>
        <IconButton
          size={8}
          icon={MoreHorizontal}
          className="size-6 opacity-0 transition-opacity group-hover:opacity-100 text-slate-400 hover:text-slate-200 hover:bg-slate-700"
        />
      </div>
      {/* <span className="text-sm">Deadline: {task.deadline}</span> */}
      <p className="mt-1 text-sm text-muted">Deadline: {task.deadline}</p>
    </div>
  );
}

export default TaskCard;
