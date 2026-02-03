import { PrimaryButton } from "@components/Buttons";
import { Modal } from "@components/ui/Modal";
import type { TaskItem } from "@types";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  task?: TaskItem;
};

const defaultTask: TaskItem = {
  id: null,
  project: null,
  title: "",
  status: "todo",
  deadline: new Date().toString(),
};

function TaskEditModal({ open, onClose, task }: Props) {
  const [taskInfo, setTaskInfo] = useState<TaskItem>(task ?? defaultTask);
  const [hourChecked, setHourChecked] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setTaskInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeCheckHour = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value: boolean = target.checked;
    setHourChecked(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(taskInfo);
  };

  useEffect(() => {
    if (task) setTaskInfo(task);
    if (task?.hour) setHourChecked(true);
  }, [task]);

  // If no task data, just show an empty modal (or nothing)
  if (!task) return <Modal open={open} onClose={onClose} children={<></>} />;
  return (
    <Modal open={open} onClose={onClose} panelClass="max-w-lg!" title="Task">
      <form onSubmit={(e) => onSubmit(e)} className="space-y-5 p-2 text-foreground">
        {/* Title */}
        <div>
          <label htmlFor="taskTitle" className="block mb-1 text-md font-medium">
            Title
          </label>
          <input
            id="taskTitle"
            type="text"
            name="title"
            value={taskInfo.title}
            onChange={(e) => onChange(e)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Status */}
          <div className="grow">
            <label
              htmlFor="statusSelect"
              className="block mb-1 text-md font-medium"
            >
              Task Status
            </label>
            <select
              name="status"
              id="statusSelect"
              onChange={onChange}
              value={taskInfo.status}
            >
              <option value="todo">todo</option>
              <option value="inprogress">inprogress</option>
              <option value="approval">approval</option>
              <option value="done">done</option>
            </select>
          </div>
          {/* Deadline */}
          <div className="grow">
            <label
              htmlFor="taskDeadline"
              className="block mb-1 text-md font-medium"
            >
              Task deadline
            </label>
            <input
              id="taskDeadline"
              type="date"
              name="deadline"
              value={taskInfo.deadline}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Hour Checkbox */}
          <div className="grow">
            <label className="block mb-1 text-md font-medium">
              Enable Hour?
            </label>
            <div className="flex items-center">
              <input
                id="taskHourCheck"
                type="checkbox"
                checked={hourChecked}
                onChange={onChangeCheckHour}
                className="h-6 sm:h-10 w-6 sm:w-10 m-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <label
                htmlFor="taskHourCheck"
                className="text-sm font-medium text-foreground cursor-pointer select-none"
              >
                If not checked, the hour will save as empty.
              </label>
            </div>
          </div>
          {/* Hour */}
          <div className="grow">
            <label
              htmlFor="taskHour"
              className="block mb-1 text-md font-medium"
            >
              Task hour
            </label>
            <input
              disabled={!hourChecked}
              id="taskHour"
              type="time"
              name="hour"
              value={taskInfo.hour ?? "12:00"}
              onChange={onChange}
              required={false}
              className={` w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary 
                ${hourChecked ? "" : "bg-muted/40"}
                `}
            />
          </div>
        </div>
      </form>
      <div className="flex justify-between mt-4 text-card">
        <PrimaryButton className="font-bold p-2! ">
          <Pencil size={16} />
          Submit
        </PrimaryButton>
        <PrimaryButton className="font-bold px-3 py-2!  bg-red-600/80 hover:bg-red-700">
          <Trash size={16} />
          Delete
        </PrimaryButton>
      </div>
    </Modal>
  );
}

export default TaskEditModal;
