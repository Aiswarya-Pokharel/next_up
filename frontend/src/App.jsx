import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./Context/AuthContext";
import WelcomePage from "./components/landing_page/WelcomePage";
import Dashboard from "./components/dashboard/Dashboard";
import TaskList from "./components/tasks/TaskList";
import Layout from "./components/Layout.jsx/Layout";

export default function App() {
  return (
    // <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/home/tasks" element={<TaskList />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // </AuthProvider>
  );
}
