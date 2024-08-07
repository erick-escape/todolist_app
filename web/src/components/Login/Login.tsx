import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input"; // Certifique-se de ter um componente de input estilizado com shadcn
import reactLogo from "../../assets/react.svg"; // Certifique-se de ter um logo para o seu projeto
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/tasks");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <img src={reactLogo} alt="Logo" className="h-16" />{" "}
        </div>
        <h2 className="text-2xl font-bold text-white mb-6 flex justify-center">
          Task Manager
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <Button type="submit" className="w-full py-2">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
