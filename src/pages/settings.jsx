import React, { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export default function Settings() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [pfp, setPfp] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsername(data.username);
      setBio(data.bio || "");
      setPfp(data.pfp || "");
    }
    fetchUser();
  }, []);

  const handleSave = async () => {
    const res = await fetch(`${API_URL}/users/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, bio, pfp }),
    });
    if (res.ok) alert("Profile updated!");
  };

  return (
    <div className="settings-page">
      <h1>🌿 Settings</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <input
        type="text"
        placeholder="Profile Picture URL"
        value={pfp}
        onChange={(e) => setPfp(e.target.value)}
      />
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
}
