import type { LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
};

export default function Auth() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
