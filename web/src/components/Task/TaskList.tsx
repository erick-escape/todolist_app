import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { TaskItem } from "../ui/TaskItem";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import userAvatar from "../../assets/react.svg";

type Task = {
  id: number;
  title: string;
  description: string;
};

type User = {
  username: string;
};

const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User | null>(null);

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

  const handleEdit = (taskId: number) => {
    console.log(`Edit task with ID: ${taskId}`);
    navigate(`/task-details/${taskId}`);
  };

  const handleDelete = (taskId: number) => {
    console.log(`Delete task with ID: ${taskId}`);
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
