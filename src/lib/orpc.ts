import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createORPCSvelteQueryUtils } from "@orpc/svelte-query";
import type { appRouter, AppRouterClient } from "./services/api/routers";

declare global {
	var $client: RouterClient<typeof appRouter> | undefined;
}

const link = new RPCLink({
	url: () => {
		if (typeof window === "undefined") {
			throw new Error("This link is not allowed on the server side.");
		}

		return `${window.location.origin}/api`;
	}
});

const client: AppRouterClient = globalThis.$client ?? createORPCClient(link);

export const orpc = createORPCSvelteQueryUtils(client);
