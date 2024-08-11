import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import TaskList from "./components/Task/TaskList";
import TaskEdit from "./components/Task/TaskEdit";
import UserDetails from "./components/UserDetails/UserDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/task-details/:taskId" element={<TaskEdit />} />
        <Route path="/user-details" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
