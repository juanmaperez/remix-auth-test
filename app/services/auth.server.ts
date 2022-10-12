// Create an instance of the authenticator, pass a generic with what

import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "./session.server";

// strategies will return and will store in the session
export const authenticator = new Authenticator(sessionStorage, {
  sessionKey: "sessionKey",
  sessionErrorKey: "sessionErrorKey"
});

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email");
    let password = form.get("password");

    if (typeof email !== "string" || !email || email !== "random@email.com") {
      throw new AuthorizationError("wrongEmail");
    }

    if (typeof password !== "string" || !password || password.length < 4) {
      throw new AuthorizationError("wrongEmail");
    }

    return null;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);

