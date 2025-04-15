import { cookies } from "next/headers";

import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";
import { amplifyConfig } from "./amplify-config";
import { type Schema } from "./amplify-schema";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: amplifyConfig,
});

export async function AuthGetCurrentUserServer() {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });
    return currentUser;
  } catch (error) {
    console.error(error);
  }
}

export async function AuthGetSessionServer() {
  try {
    const session = await runWithAmplifyServerContext({
      nextServerContext: { cookies }, // Pass cookies from next/headers
      operation: (contextSpec) => fetchAuthSession(contextSpec), // Use fetchAuthSession
    });
    return session;
  } catch (error) {
    console.error("AuthGetSessionServer Error:", error);
  }
}