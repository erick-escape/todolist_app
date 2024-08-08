import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IconArrowLeft } from "@tabler/icons-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: 0,
    username: "",
    email: "",
    password: ""
  });

  useEffect(() => {
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
          toast.error("Failed to fetch user");
        }
      } catch (error) {
        toast.error("Error fetching user");
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No token found, redirecting to login");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/user/${user.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        toast.success("User updated successfully");
        navigate("/tasks");
      } else {
        toast.error("Failed to update user");
      }
    } catch (error) {
      toast.error("Error updating user");
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <button
          onClick={() => navigate("/tasks")}
          className="flex items-center text-gray-300"
        >
          <IconArrowLeft className="h-6 w-6 mr-2" />
          <span>Voltar</span>
        </button>
      </nav>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Detalhes do Usuário</h1>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg space-y-4">
          <form onSubmit={handleSave}>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <Input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <Input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <Button type="submit" variant="default" className="mt-4">
              Salvar
            </Button>
          </form>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default UserDetails;
