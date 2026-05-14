import { useState } from "react";
import { supabase } from "../lib/supabase";
import "./Auth.css";
import ShowPasswordButton from "./buttons/ShowPasswordButton";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Pink Notes</h1>
        <p className="auth-subtitle">≽^•⩊•^≼</p>

        <input
          className="auth-input email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-input-container">
          <input
            className="auth-input password"
            type={`${isVisiblePassword ? "text" : "password"}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ShowPasswordButton
            isVisiblePassword={isVisiblePassword}
            setIsVisiblePassword={setIsVisiblePassword}
          />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button
          className="auth-button primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "..." : isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <button
          className="auth-button secondary"
          onClick={() => {
            setIsSignUp((prev) => !prev);
            setError("");
          }}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "No account? Sign Up"}
        </button>
      </div>
    </div>
  );
}
