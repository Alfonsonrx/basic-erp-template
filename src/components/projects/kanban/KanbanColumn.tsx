import type { Column } from "@types";
import TaskCard from "./TaskCard";

type Props = {
  column: Column;
  onDragStart: (e: React.DragEvent, taskId: number| null) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
  isDragOver: boolean;
};

function KanbanColumn({
  column,
  onDragStart,
  onDragOver,
  onDrop,
  isDragOver,
}: Props) {
  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
      className={`flex min-h-50 h-fit flex-col rounded-xl p-4 transition-colors shadow-lg ${isDragOver ? "ring-2 ring-teal-500/50 bg-card" : "bg-card/80"}`}
    >
      <div className=" mb-4 flex items-center justify-between">
        <h2 className="text-lg underline font-semibold text-foreground">{column.title}</h2>
        {column.icon ? <column.icon size={24}/> : null}
      </div>
      <div className="flex flex-col gap-3">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;
