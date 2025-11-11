import type { RouterClient } from "@orpc/server";
import { recommendationsRouter } from "./recommendations";

export const appRouter = {
	...recommendationsRouter
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
