import { Link } from "react-router-dom";
import stylesUrl from "../styles/index.css";
import { authenticator } from "~/services/auth.server";
import type { LoaderArgs } from "@remix-run/node";

export function meta() {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
}

export function links() {
  return [{ rel: "stylesheet", href: stylesUrl }];
}

export async function loader({ request }: LoaderArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

export default function Index() {

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>Welcome to Remix on CodeSandbox!</h2>
      <p>
        <a href="https://docs.remix.run">Check out the docs</a> to get started.
      </p>
      <p>
        <Link to="not-found">Link to 404 not found page.</Link> Clicking this
        link will land you in your root CatchBoundary component.
      </p>
    </div>
  );
}
