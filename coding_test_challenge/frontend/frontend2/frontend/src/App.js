import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import TaskViewPage from "./pages/TaskViewPage"
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" />} />
      <Route path="/tasks" element={<TaskViewPage />} />
    </Routes>
    </Router>
  );
}

export default App;
