import axios from "axios";
import { useState, useEffect } from "react";

export const Users = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:10000/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        setUsers(res.data);
      }
    };

    fetchUsers();
  }, []);

  console.log("users", users);

  // TODO: Make a table of users
  // Columns: Name, Email, Role

  return (
    <div
      style={{
        backgroundColor: "red",
      }}
    >
      <h1>Users</h1>
    </div>
  );
};
