import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { articleRouter } from "./routers/articles";
import { leaveRouter } from "./routers/leave";
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  article: articleRouter,
  leave: leaveRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;