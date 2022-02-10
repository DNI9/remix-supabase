import { Link, LoaderFunction, useLoaderData } from "remix";
import { getLoggedInUser } from "~/sessions.server";
import { useUser } from "~/useUser";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getLoggedInUser(request);
  return user;
};

export default function Index() {
  const { user } = useUser();
  const { id: userId } = useLoaderData() || {};

  return (
    <div className="flex flex-col justify-center items-center mt-36">
      <h1 className="text-5xl font-bold mb-2 text-center">
        Remix + Supabase Auth + Tailwind Starter
      </h1>

      {!user && (
        <Link to="login" className="mt-3">
          <button>Sign in</button>
        </Link>
      )}

      <div className="my-2">
        {user && <p>User from client is: {user.id}</p>}
        {userId && <p>User from server is: {userId}</p>}
      </div>
      {user && (
        <Link to="profile" className="mt-3">
          <button>Go to Profile</button>
        </Link>
      )}
    </div>
  );
}
