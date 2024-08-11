import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import reactLogo from "../../assets/react.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password")
    };

    try {
      const response = await fetch("http://localhost:8000/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        navigate("/tasks");
      } else {
        const data = await response.json();
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <img src={reactLogo} alt="Logo" className="h-16" />
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
        <div className="mt-4 text-center">
          <p className="text-gray-400">Não tem uma conta?</p>
          <Button
            variant="link"
            className="text-indigo-500 hover:underline"
            onClick={() => navigate("/register")}
          >
            Cadastre-se
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
