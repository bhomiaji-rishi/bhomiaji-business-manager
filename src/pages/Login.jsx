import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error: signInError } = await signIn(email, password);

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    navigate("/");
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand-mark">B</div>

        <p className="eyebrow">BHOMIAJI</p>
        <h1>Business Manager</h1>
        <p className="login-subtitle">
          Sign in to manage your business.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            required
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="primary-button login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
