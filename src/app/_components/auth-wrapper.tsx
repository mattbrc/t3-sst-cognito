// src/components/AuthWrapper.tsx
"use client"; // This component uses client-side features

import React from "react";
import {
  Authenticator,
  useAuthenticator,
  View,
  Button,
  Text,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css"; // Import default Amplify UI styles
import { Amplify } from "aws-amplify";
import { amplifyConfig } from "~/utils/amplify-config";

Amplify.configure(amplifyConfig, {
  ssr: true,
});

// This wrapper component will display the Authenticator UI if the user is not logged in,
// otherwise, it will render the children (your application).
export function AuthWrapper({ children }: { children: React.ReactNode }) {
  // You can optionally use the useAuthenticator hook *inside* the Authenticator
  // or in child components to get auth state and the signOut function.
  // Here's an example showing a simple sign-out button after login.

  return (
    <Authenticator loginMechanisms={["email"]} /* Customize login mechanisms */>
      {/* The Authenticator renders its children *after* successful login. */}
      {/* You can optionally use the render prop to access signOut and user */}
      {({ signOut, user }) => (
        <View>
          {/* Simple Welcome and Sign Out Button */}
          <View
            padding="small"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {user && (
              <Text padding="medium">
                Welcome, {user.signInDetails?.loginId ?? user.username}!
              </Text>
            )}
            <Button onClick={signOut} variation="primary" size="small">
              Sign Out
            </Button>
          </View>

          {/* Render the main application content */}
          {children}
        </View>
      )}
    </Authenticator>
  );
}

// --- Basic Version (without the custom sign out button inside) ---
// If you just want the Authenticator to handle login/signup and then show your app:
/*
export function AuthWrapper({ children }: { children: React.ReactNode }) {
   return (
       <Authenticator>
          { // Render children directly after authentication }
          {children}
       </Authenticator>
   );
}
*/
