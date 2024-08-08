import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [taskId, setTaskId] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("No token found, redirecting to login");
      navigate("/login");
      return;
    }

    const taskFormData = new FormData();
    taskFormData.append("title", title);
    taskFormData.append("description", description);

    try {
      // Primeiro, crie a tarefa
      const taskResponse = await fetch("http://localhost:8000/task/create/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description
        })
      });

      if (!taskResponse.ok) {
        toast.error("Failed to create task");
        return;
      }

      const taskData = await taskResponse.json();
      setTaskId(taskData.id);

      // Se houver um arquivo, envie o anexo
      if (file) {
        const attachmentFormData = new FormData();
        attachmentFormData.append("task_id", taskData.id.toString());
        attachmentFormData.append("file", file);

        const attachmentResponse = await fetch(
          "http://localhost:8000/attachment/create/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: attachmentFormData
          }
        );

        if (attachmentResponse.ok) {
          toast.success("Task and attachment created successfully");
          navigate("/tasks");
        } else {
          toast.error("Failed to create attachment");
        }
      } else {
        toast.success("Task created successfully");
        navigate("/tasks");
      }
    } catch (error) {
      toast.error("Error creating task or attachment");
      console.error("Error creating task or attachment:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white mb-6 flex justify-center">
          Add New Task
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300"
            >
              Title
            </label>
            <Input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-300"
            >
              Attach File
            </label>
            <Input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <Button type="submit" className="w-full py-2">
            Create Task
          </Button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddTask;
