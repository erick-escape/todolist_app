import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { TaskItem } from "../ui/TaskItem";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import userAvatar from "../../assets/react.svg";
import { toast } from "react-toastify";

type Task = {
  id: number;
  title: string;
  description: string;
  done: boolean;
};

type User = {
  username: string;
};

const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("No token found, redirecting to login");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/task/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("No token found, redirecting to login");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/user/me/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchTasks();
    fetchUser();
  }, [navigate]);

  const handleToggleComplete = async (taskId: number, done: boolean) => {
    // Logic to update the task's completion status in the backend
    console.log(`Task ID: ${taskId}, Completed: ${done}`);
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
        const task = await response.json();
        if (task) {
          task.done = !task.done;
          const response = await fetch(`http://localhost:8000/task/${taskId}/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(task),
          });

          if (response.ok) {
            toast.success("Tarefa atualizada com sucesso!");
            setTasks(prevTasks =>
              prevTasks.map(task =>
                task.id === taskId ? { ...task, done } : task
              )
            );
          } else {
            console.error("Failed to update task");
            toast.error("Erro ao atualizar tarefa");
          }
        } else {
          console.log("No task found for this task.");
          toast.error("Erro ao buscar tarefa");
        }
      } else {
        console.error("Failed to fetch task");
        toast.error("Erro ao buscar tarefa");
      }
    } catch (error) {
      console.error("Error fetching task:", error);
      toast.error("Erro ao buscar tarefa" + error);
    }
    // Update the local state after successful backend update (pseudo-code)

  };

  const handleEdit = (taskId: number) => {
    console.log(`Edit task with ID: ${taskId}`);
    navigate(`/task-details/${taskId}`);
  };

  const handleDelete = async (taskId: number) => {
    console.log(`Delete task with ID: ${taskId}`);
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No token found, redirecting to login");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/task/${taskId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Task deleted successfully");
        await sleep(1500);
        window.location.reload();
        return;
      } else {
        //throw new exception("Failed to delete task")
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task" + error);
    }
  };

  const handleAttach = async (taskId: number) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No token found, redirecting to login");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/attachment/?task_id=${taskId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        const attachments = await response.json();
        if (attachments.length > 0) {
          const attachmentUrl = `http://localhost:8000${attachments[0].file}`;
          window.open(attachmentUrl, "_blank");
        } else {
          console.log("No attachments found for this task.");
          toast.info("No attachments found for this task.");
        }
      } else {
        console.error("Failed to fetch attachments");
      }
    } catch (error) {
      console.error("Error fetching attachments:", error);
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/add-task");
  };

  const handleUserDetails = () => {
    navigate("/user-details");
  };

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
            <span>{user?.username || "Loading..."}</span>
          </div>
        </div>
      </nav>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Suas Tarefas</h1>
        <div className="space-y-4">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              done={task.done}
              onEdit={() => handleEdit(task.id)}
              onDelete={() => handleDelete(task.id)}
              onAttach={() => handleAttach(task.id)}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default TaskList;
