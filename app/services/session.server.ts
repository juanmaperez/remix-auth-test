import type { Request, Session } from "@remix-run/node";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "random_session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: ["secret"],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
});

export async function updateSession(session: Session) {
  let headers = new Headers({
    "Set-Cookie": await sessionStorage.commitSession(session)
  });
  return headers;
}

export function getUserSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const user = session.get("user");
  if (!user || !user.id || typeof user.id !== "string") return null;
  return user.id;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const user = session.get("user");
  if (!user || !user.id || typeof user.id !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return user.id;
}

export let { getSession, commitSession, destroySession } = sessionStorage;
