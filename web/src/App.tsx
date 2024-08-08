import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import TaskList from "./components/Task/TaskList";
import UserDetails from "./components/UserDetails/UserDetails";
import Register from "./components/Register/Register";
import AddTask from "./components/Task/AddTask";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
