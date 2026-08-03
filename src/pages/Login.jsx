import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { notify } from "../utils/notify";
export default function Login() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");


    const result = await signIn(email.trim(), password);
setLoading(false);
if (result.error) {
  toast.error(result.error.message);

  setMessage(
    `ERROR: ${result.error.message}`
  );

  return;
}

   notify.success("Welcome back!");
  setMessage("LOGIN SUCCESSFUL");
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand-mark">B</div>

        <p className="eyebrow">BHOMIAJI</p>

        <h1>Business Manager</h1>

        <p className="login-subtitle">
          Sign in to your account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="login-form"
        >
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Email"
            required
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="primary-button login-button"
            disabled={loading}
          >
            {loading ? "Checking..." : "Sign In"}
          </button>

          {message && (
            <div className="error-message">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
