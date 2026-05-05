import { useState } from "react";

function LoginComponent({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
  e.preventDefault();

  const res = await fetch("api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    alert("Invalid credentials");
    return;
  }

  const data = await res.json();   // ⭐ define data

  const userData = {
    userId: data.id,
    name: `${data.first_name} ${data.last_name}`,
    email: data.email
  };

  onLogin(userData);

  // ⭐ persist login
  localStorage.setItem("user", JSON.stringify(userData));
}

  return (
    <form onSubmit={handleLogin} className="post-form">
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button>Login</button>
    </form>
  );

}

export default LoginComponent;