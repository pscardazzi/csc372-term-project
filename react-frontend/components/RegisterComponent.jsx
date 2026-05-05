import { useState } from "react";

function Register({ onRegister }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password
      })
    });

    if (res.ok) {
      const data = await res.json();

      const fullName = `${data.first_name} ${data.last_name}`;

      onRegister({
        userId: data.id,
        name: fullName,
        email: data.email
      });
    } else {
      alert("Registration failed");
    }
  }

  return (
    <form onSubmit={handleRegister} className="post-form">
      <input
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder="First Name"
      />

      <input
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        placeholder="Last Name"
      />

      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button>Register</button>
    </form>
  );
}

export default Register;
