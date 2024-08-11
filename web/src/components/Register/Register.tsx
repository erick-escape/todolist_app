import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const registerData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password")
    };

    try {
      const response = await fetch("http://localhost:8000/user/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
      });

      if (response.ok) {
        navigate("/");
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
        <h2 className="text-2xl font-bold text-white mb-6 flex justify-center">
          Register
        </h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <Input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
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
            Register
          </Button>
        </form>
        <div className="text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <a
            href="/"
            className="text-indigo-500 hover:text-indigo-400 underline"
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
