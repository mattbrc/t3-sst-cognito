// utils/amplify-utils.ts
import { cookies } from "next/headers";

import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { getCurrentUser } from "aws-amplify/auth/server";
import { amplifyConfig } from "./amplify-config";
import { type Schema } from "./amplify-schema";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: amplifyConfig,
});

export const cookiesClient = generateServerClientUsingCookies<Schema>({
  config: amplifyConfig,
  cookies,
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