import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password)
      navigate('/articles')
    } catch (error) {
      setError(error.message)
    } 
  }

  return (
    <>
      <h1>Login Page</h1>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Log In</button>
      <Link to="/create-account">Create account here</Link>
    </>
  );
};
