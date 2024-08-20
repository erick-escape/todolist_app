import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import { toast } from "react-toastify";

type Task = {
  id: number;
  title: string;
  description: string;
};

const EditTask = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("No token found, redirecting to login");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/task/${taskId}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setTask(data);
        } else {
          console.error("Failed to fetch task");
          setError("Failed to fetch task");
        }
      } catch (error) {
        console.error("Error fetching task:", error);
        setError("Error fetching task");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [taskId, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask(prevTask => (prevTask ? { ...prevTask, [name]: value } : null));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No token found, redirecting to login");
      navigate("/login");
      return;
    }

    if (task) {
      try {
        const response = await fetch(`http://localhost:8000/task/${taskId}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(task)
        });

        if (response.ok) {
          toast.success("Task updated successfully");
          navigate("/tasks");
        } else {
          console.error("Failed to update task");
          setError("Failed to update task");
        }
      } catch (error) {
        console.error("Error updating task:", error);
        setError("Error updating task");
      }
    }
  };

  const handleCancel = () => {
    navigate("/tasks");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">{error}</div>
    );
  }

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
              value={task?.title || ""}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="description"
            >
              Descrição
            </label>
            <textarea
              name="description"
              id="description"
              value={task?.description || ""}
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
