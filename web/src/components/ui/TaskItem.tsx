import React from "react";
import { Button } from "../ui/button";
import { IconEdit, IconTrash, IconPaperclip } from "@tabler/icons-react";

interface TaskItemProps {
  id: number;
  title: string;
  description: string;
  done: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onAttach: (taskId: number) => void;
  onToggleComplete: (taskId: number, done: boolean) => void; // New prop for handling the checkbox toggle
}

export const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  done,
  onEdit,
  onDelete,
  onAttach,
  onToggleComplete,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggleComplete(id, e.target.checked);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-xl font-bold mb-2 ${done ? "line-through text-gray-500" : ""}`}>
            {title}
          </h2>
          <p className={`text-gray-300 ${done ? "line-through text-gray-500" : ""}`}>
            {description}
          </p>
        </div>
        <div className="flex space-x-2 items-center">
          {/* Checkbox for marking the task as completed */}
          <input
            type="checkbox"
            checked={done}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
          />
          <Button
            onClick={onEdit}
            variant="secondary"
            size="sm"
            className="flex items-center"
          >
            <IconEdit className="h-5 w-5 mr-1" />
            Editar
          </Button>
          <Button
            onClick={onDelete}
            variant="destructive"
            size="sm"
            className="flex items-center"
          >
            <IconTrash className="h-5 w-5 mr-1" />
            Excluir
          </Button>
          <Button
            onClick={() => onAttach(id)}
            variant="default"
            size="sm"
            className="flex items-center"
          >
            <IconPaperclip className="h-5 w-5 mr-1" />
            Anexos
          </Button>
        </div>
      </div>
    </div>
  );
};
