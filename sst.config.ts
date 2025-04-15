// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "cognito-auth",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: "dev-account",
          region: "us-east-1",
        },
      },
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("MyVpc");
    const postgres = new sst.aws.Postgres("MyPostgres", {
      vpc,
      dev: {
        username: "matt", // your local postgres username
        password: "password", // your local postgres password
        database: "cognito_auth",    // your local database name
        host: "localhost",    // your local postgres host
        port: 5432            // your local postgres port
      }
    });

    const userPool = new sst.aws.CognitoUserPool("MyUserPool");
    const webClient = userPool.addClient("WebClient");

    new sst.aws.Nextjs("MyWeb", {
      vpc,
      link: [postgres, userPool, webClient],
      environment: {
        NEXT_PUBLIC_REGION: "us-east-1",
        NEXT_PUBLIC_USER_POOL_ID: userPool.id,
        NEXT_PUBLIC_USER_POOL_CLIENT_ID: webClient.id,
        COGNITO_USER_POOL_ID: userPool.id,
        COGNITO_APP_CLIENT_ID: webClient.id, 
        AWS_REGION: "us-east-1",
      }
    });

    new sst.x.DevCommand("Studio", {
      link: [postgres],
      dev: {
        command: "npx drizzle-kit studio",
      },
    });
    return {
      UserPoolId: userPool.id,
      UserPoolClientId: webClient.id,
    };
  },
});
