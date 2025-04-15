import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Todo: a
    .model({
      content: a.string()
    })
    .authorization((allow) => [
      allow.owner(),
      allow.publicApiKey().to(["read"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;
