import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import axios from "axios";
import styles from "../styles/Soil.module.css";

function getUserName() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.name;
  // return decoded.name || decoded.email || decoded.username || null;
}

export const SoilChat = () => {
  const userName = getUserName();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;
    // trim go pravi slednoto -> " test " = "test"

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:10000/api/v1/soil/chat",
        {
          prompt: input,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: res.data.answer || "No response." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Error communicating with server!" },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Ask a question</h2>
      {userName && <div>Logged user: {userName}</div>}

      <div className={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.role === "user"
                ? `${styles.message} ${styles.messageUser}`
                : `${styles.message}`
            }
          >
            <span
              className={
                msg.role === "user"
                  ? `${styles.bubble} ${styles.bubbleUser}`
                  : `${styles.bubble} ${styles.bubbleAi}`
              }
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      {loading && <div className={styles.loading}>Loading...</div>}

      <form onSubmit={handleSend} className={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about soils"
        />
        <button type="submit" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};
