import React, { useState } from "react";
import { LinksFunction, useNavigate } from "remix";
import { supabase } from "~/supabase";
import stylesUrl from "../styles/auth.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleSubmitSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError) setError(signUpError.message);
    else navigate("/");

    setLoading(false);
  };

  const handleGoogleSignup = () => {
    supabase.auth.signIn({ provider: "google" });
  };

  return (
    <div>
      <p>Signup to your app</p>
      <form onSubmit={handleSubmitSignup}>
        <label>
          Email
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>
          Signup
        </button>
      </form>
      <button onClick={handleGoogleSignup}>Sign up with Google</button>
      {error}
    </div>
  );
}
