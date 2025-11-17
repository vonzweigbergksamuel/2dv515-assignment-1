import type { RouterClient } from "@orpc/server";
import { publicProcedure } from "..";
import { recommendationsRouter } from "./recommendations";
import { usersRouter } from "./users";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	...recommendationsRouter,
	...usersRouter
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
