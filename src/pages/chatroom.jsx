import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;
let socket;

export default function ChatRoom() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    socket = io(API_URL);
    socket.emit("join_chat", id);

    socket.on("new_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  const sendMessage = () => {
    if (!content) return;
    const userId = JSON.parse(atob(token.split(".")[1])).id;
    socket.emit("send_message", { chatId: id, userId, content });
    setContent("");
  };

  return (
    <div className="chatroom-page">
      <h1>🌸 Chat Room</h1>
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className="message-bubble">
            <strong>{msg.user_id}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
