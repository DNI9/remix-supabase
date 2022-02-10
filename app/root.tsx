import * as React from "react";
import type { LinksFunction } from "remix";
import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import Layout from "./components/Layout";
import RouteChangeAnnouncement from "./components/RouteChangeAnnouncement";
import { getLoggedInUser } from "./sessions.server";
import styles from "./styles/app.css";
import { UserContextProvider } from "./useUser";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

interface RootLoader {
  ENV: { [key: string]: string };
}

export const loader: LoaderFunction = async ({ request }) => {
  const ENV = {
    PUBLIC_SUPABASE_URL: process.env.PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY: process.env.PUBLIC_SUPABASE_ANON_KEY,
  };

  const user = await getLoggedInUser(request);
  return { ENV, user };
};

/**
 This component loads environment variables into window.ENV
 */
function EnvironmentSetter({ env }: { env: { [key: string]: string } }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.ENV = ${JSON.stringify(env)}`,
      }}
    />
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-800 text-white">
        {children}
        <RouteChangeAnnouncement />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

/**
 * The root module's default export is a component that renders the current
 * route via the `<Outlet />` component. Think of this as the global layout
 * component for your app.
 */
export default function App() {
  const { ENV } = useLoaderData<RootLoader>();

  return (
    <Document>
      <UserContextProvider>
        <Layout>
          <Outlet />
        </Layout>
      </UserContextProvider>
      <EnvironmentSetter env={ENV} />
    </Document>
  );
}
