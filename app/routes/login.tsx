import { supabase } from "~/supabase";

export default function LogIn() {
  const handleGoogleSignup = () => {
    supabase.auth.signIn({ provider: "google" });
  };

  return (
    <div>
      <p>Log in to your app</p>
      <button onClick={handleGoogleSignup}>Log in with Google</button>
    </div>
  );
}
