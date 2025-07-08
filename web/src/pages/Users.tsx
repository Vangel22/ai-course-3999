import axios from "axios";
import { useEffect, useState } from "react";

export const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("/api/users");
    };
  }, []);
  return (
    <div>
      {users.map((user) => (
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
          <tr>
            <th>{user.name}</th>
            <th>{user.email}</th>
            <th>{user.role}</th>
          </tr>
        </table>
      ))}
    </div>
  );
};
