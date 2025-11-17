import type { RouterClient } from "@orpc/server";
import { recommendationsRouter } from "./recommendations";
import { usersRouter } from "./users";

export const appRouter = {
	...recommendationsRouter,
	...usersRouter
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
