import { useState } from "react";

function LoginComponent({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      const data = await res.json();

      const fullName = `${data.first_name} ${data.last_name}`;

      onLogin({
        userId: data.userId,
        name: fullName,
        email: data.email
      });
    } else {
      alert("Invalid login");
    }
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