"use client";

import { Amplify } from "aws-amplify";
import { amplifyConfig } from "~/utils/amplify-config"; // Adjust path as needed

// Configure Amplify client-side
Amplify.configure(amplifyConfig, {
  ssr: true, // IMPORTANT for Next.js
});

export default function ConfigureAmplifyClientSide({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
