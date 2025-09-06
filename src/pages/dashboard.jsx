import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/");

    async function fetchChats() {
      const res = await fetch(`${API_URL}/chats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setChats(data);
    }

    fetchChats();
  }, []);

  return (
    <div className="dashboard-page">
      <h1>🌿 Your Garden Chats</h1>
      <ul className="chat-list">
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="chat-item"
            onClick={() => navigate(`/chat/${chat.id}`)}
          >
            <img
              src={chat.pfp || "/default-chat.png"}
              alt="chat"
              className="chat-pfp"
            />
            <div>
              <strong>{chat.name}</strong>
              <p>{chat.bio}</p>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/settings")}>⚙️ Settings</button>
    </div>
  );
}
