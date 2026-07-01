import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./Context/AuthContext";
import WelcomePage from "./components/landing_page/WelcomePage";
import Dashboard from "./components/dashboard/Dashboard";

export default function App() {
  return (
    // <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    // </AuthProvider>
  );
}
