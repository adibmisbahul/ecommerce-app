import React from "react";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);

  function handleLogin() {
    axios
      .post(
        "http://localhost:3000/api/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true },
      )
      .then((res) => console.log(res.data),  setError(false))
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }
  return (
    <div className="p-[20vw]">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded p-3"
        />
        <input
          type="text"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-3"
        />
        <button onClick={handleLogin} className="bg-blue-500 p-3 rounded-lg">
          Login
        </button>
        {error && (
          <div>
            <h1 className="text-red-600">error</h1>
          </div>
        )}
      </div>
    </div>
  );
}
