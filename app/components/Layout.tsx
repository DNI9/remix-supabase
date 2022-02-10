import React from "react";
import { Link, useLoaderData } from "remix";

export default function Layout({ children }: { children: React.ReactNode }) {
  const loader = useLoaderData() || {};
  const userId = loader.user?.id;

  return (
    <div className="">
      <header className="bg-gray-700 p-3 text-white">
        <nav aria-label="Main navigation">
          <ul className="flex space-x-3">
            <li>
              <Link to="/">Home</Link>
            </li>
            {userId ? (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
