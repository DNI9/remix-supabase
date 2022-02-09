import { Link, LoaderFunction, useLoaderData } from "remix";
import { getLoggedInUser } from "~/sessions.server";
import { supabase } from "~/supabase";
import { useUser } from "~/useUser";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getLoggedInUser(request);
  return user;
};

export default function Index() {
  const { user } = useUser();
  const { id: userId } = useLoaderData() || {};

  return (
    <div>
      <h1>Remix + Supabase Auth Starter</h1>

      {user && <p>Your user id from client is: {user.id}</p>}

      {userId && <p>Your user from server is: {userId}</p>}

      {user && <button onClick={() => supabase.auth.signOut()}>logout</button>}

      {!user && (
        <p>
          You are not logged in yet, go <Link to="signup">sign up</Link> or{" "}
          <Link to="login">log in</Link>!
        </p>
      )}
    </div>
  );
}
