import { LoaderFunction } from "remix";
import { requireUserAccess } from "~/sessions.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserAccess(request);
  return {};
};

export default function Profile() {
  return <h1>Private page</h1>;
}
