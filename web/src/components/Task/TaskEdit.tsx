import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { IconArrowLeft } from "@tabler/icons-react";

const EditTask = () => {
  const { taskId } = useParams(); // Getting taskId from the URL params
  const navigate = useNavigate();

  // Example initial state, this might come from an API or context
  const [task, setTask] = useState({ title: "", description: "" });

  useEffect(() => {
    // Fetch the task data by taskId (this could be an API call)
    // Assuming a function fetchTaskById is defined elsewhere
    const fetchedTask = {
      id: taskId,
      title: `Tarefa ${taskId}`,
      description: `Descrição da tarefa ${taskId}`,
    };
    setTask(fetchedTask);
  }, [taskId]);

  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSave = () => {
    // Logic to save the edited task
    console.log("Saved task:", task);
    navigate("/tasks"); // Navigate back to the task list after saving
  };

  const handleCancel = () => {
    navigate("/tasks"); // Navigate back to the task list without saving
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <button
          onClick={handleCancel}
          className="flex items-center text-gray-300"
        >
          <IconArrowLeft className="h-6 w-6 mr-2" />
          <span>Voltar</span>
        </button>
      </nav>

      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Editar Tarefa</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="title">
              Título
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={task.title}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="description">
              Descrição
            </label>
            <textarea
              name="description"
              id="description"
              value={task.description}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 rounded"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <Button onClick={handleCancel} variant="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSave} variant="default">
              Salvar
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditTask;
