import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./src/pages/Login";
import Signup from "./src/pages/Signup";
import Dashboard from "./src/pages/Dashboard";
import ChatRoom from "./src/pages/ChatRoom";
import Settings from "./src/pages/Settings";

export default function App() {
  return (
    <div className="min-h-screen bg-garden-light text-garden-dark font-sans">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat/:id" element={<ChatRoom />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
