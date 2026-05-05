import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import JournalPage from '../components/JournalComponent'
import LoginComponent from '../components/LoginComponent'
import Register from '../components/RegisterComponent'
import './App.css'

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [mode, setMode] = useState("login"); // "login" or "register"

  function handleLogin(userData) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  if (!user) {
    return mode === "login" ? (
      <>
        <LoginComponent onLogin={setUser} />
        <button onClick={() => setMode("register")}>Go to Register</button>
      </>
    ) : (
      <>
        <Register onRegister={setUser} />
        <button onClick={() => setMode("login")}>Go to Login</button>
      </>
    );
  }

  return <JournalPage user={user} onLogout={handleLogout} />;
}

export default App
