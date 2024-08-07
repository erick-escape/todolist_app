import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { TaskItem } from "../ui/TaskItem";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react"; // Certifique-se de ter os ícones instalados
import userAvatar from "../../assets/react.svg"; // Substitua pelo caminho do avatar do usuário

const TaskList = () => {
  const navigate = useNavigate();

  const handleEdit = (taskId: number) => {
    // Lógica para editar a tarefa
    console.log(`Edit task with ID: ${taskId}`);
  };

  const handleDelete = (taskId: number) => {
    // Lógica para excluir a tarefa
    console.log(`Delete task with ID: ${taskId}`);
  };

  const handleAttach = (taskId: number) => {
    // Lógica para anexar arquivos à tarefa
    console.log(`Attach files to task with ID: ${taskId}`);
  };

  const handleAddTask = () => {
    // Lógica para adicionar uma nova tarefa
    console.log("Add new task");
  };

  const handleUserDetails = () => {
    // Navegar para a página de detalhes do usuário
    navigate("/user-details");
  };

  const tasks = [
    { id: 1, title: "Tarefa 1", description: "Descrição da tarefa 1" },
    { id: 2, title: "Tarefa 2", description: "Descrição da tarefa 2" }
    // Adicione mais tarefas conforme necessário
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-300"
        >
          <IconArrowLeft className="h-6 w-6 mr-2" />
          <span>Voltar</span>
        </button>
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleAddTask}
            variant="secondary"
            className="flex items-center"
          >
            <IconPlus className="h-6 w-6 mr-1" />
            Adicionar Nova Tarefa
          </Button>
          <div
            className="flex items-center cursor-pointer"
            onClick={handleUserDetails}
          >
            <img
              src={userAvatar}
              alt="User Avatar"
              className="h-8 w-8 rounded-full mr-2"
            />
            <span>Nome do Usuário</span>
          </div>
        </div>
      </nav>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Suas Tarefas</h1>
        <div className="space-y-4">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              title={task.title}
              description={task.description}
              onEdit={() => handleEdit(task.id)}
              onDelete={() => handleDelete(task.id)}
              onAttach={() => handleAttach(task.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default TaskList;
