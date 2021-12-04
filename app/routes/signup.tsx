import React, { useState } from "react";
import {
  ActionFunction,
  Form,
  LinksFunction,
  redirect,
  useActionData,
} from "remix";
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

  const handleSubmitSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError) setError(signUpError.message);

    setLoading(false);
  };

  const handleClickGithubSignup = () => {
    console.log("github");

    supabase.auth.signIn({ provider: "github" });
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
      <button onClick={handleClickGithubSignup}>Sign up with github</button>
      {error}
    </div>
  );
}
