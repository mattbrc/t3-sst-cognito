import { z } from "zod";

import { createTRPCRouter, publicProcedure, privateProcedure } from "~/server/api/trpc";
import { posts } from "~/server/db/schema";
import { AuthGetSessionServer } from "~/utils/amplify-server-utils";

export const postRouter = createTRPCRouter({
  hello: privateProcedure
    .input(z.object({ text: z.string() }))
    .query(async({ ctx, input }) => {
      const user = ctx.user;
      const userId = user?.userId;
      const session = await AuthGetSessionServer();
      console.log("User from trpc context: ", user);
      console.log("User ID from trpc context: ", userId);
      console.log("Session from trpc context: ", session);
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        name: input.name,
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),
});
