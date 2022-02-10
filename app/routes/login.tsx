import { supabase } from "~/supabase";

export default function LogIn() {
  const handleGoogleSignup = () => {
    supabase.auth.signIn({ provider: "google" });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-36">
      <h1 className="text-5xl font-bold mb-2 text-center">
        Log in to continue
      </h1>
      <button onClick={handleGoogleSignup} className="mt-5">
        Continue with Google
      </button>
    </div>
  );
}
