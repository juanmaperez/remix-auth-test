import type { ActionArgs, ActionFunction, LoaderArgs, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { sessionStorage } from "~/services/session.server";

export let action: ActionFunction = async ({request}: ActionArgs) => {
  return await authenticator.authenticate('user-pass', request, {
    successRedirect: '/',
    failureRedirect: '/login',
  })
}

export let loader: LoaderFunction = async ({request}: LoaderArgs) => {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))

  const error = session.get(authenticator.sessionErrorKey)
  return json(
    {error: error?.message}
  )
}

export default function Login() {
  const data = useLoaderData()
  return (
    <Form style={{display: 'flex', flexDirection: "column", maxWidth:'400px', padding: '10px' }}method="post">
      <input type="email" name="email" required />
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        required
      />
      { data?.error && <p style={{color: 'salmon'}}>{data.error}</p>}
      <button>Sign In</button>
    </Form>
  );;
}
