import React from "react";
import { Button } from "../ui/button";
import { IconEdit, IconTrash, IconPaperclip } from "@tabler/icons-react"; // Certifique-se de ter os ícones instalados

interface TaskItemProps {
  title: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
  onAttach: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  title,
  description,
  onEdit,
  onDelete,
  onAttach
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-300">{description}</p>
        </div>
        <div className="flex space-x-2">
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
            onClick={onAttach}
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
