import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input"; // Certifique-se de ter um componente de input estilizado com shadcn
import { IconArrowLeft } from "@tabler/icons-react"; // Certifique-se de ter os ícones instalados

const UserDetails = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "Nome do Usuário",
    email: "usuario@example.com",
    password: "asdasdsadsad"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    // Lógica para salvar os dados atualizados do usuário
    console.log("Dados do usuário salvos:", user);
    e.preventDefault();
    navigate("/tasks");
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
            />
          </div>
          <Button onClick={handleSave} variant="default" className="mt-4">
            Salvar
          </Button>
        </div>
      </main>
    </div>
  );
};

export default UserDetails;
