// // src/pages/_app.tsx (or a dedicated configuration file)
// import { Amplify } from 'aws-amplify';

// const AmplifyConfig = Amplify.configure({
//   Auth: {
//     Cognito: {
//       userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID ?? '',
//       userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID ?? '',
//       // region is optional if auth config already contains it
//       // region: process.env.NEXT_PUBLIC_AWS_REGION || '',
//     }
//   },
//   // Potentially configure API module if using Amplify for API calls
//   // API: {
//   //   // ... your API configuration
//   // }
// });

// export default AmplifyConfig;

import { type ResourcesConfig } from "aws-amplify";

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID!,
    userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!,
  },
};

// Amplify.configure(
//   {
//     Auth: authConfig,
//   },
//   {
//     ssr: true,
//   }
// );

// export default function ConfigureAmplifyClientSide() {
//   return null;
// }

export const amplifyConfig: ResourcesConfig = {
  Auth: authConfig,
};