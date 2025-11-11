import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { getRequestEvent } from "$app/server";
import type { AppRouterClient } from "./services/api/routers";

if (typeof window !== "undefined") {
	throw new Error("This file should only be imported on the server");
}

const link = new RPCLink({
	url: async () => {
		return `${getRequestEvent().url.origin}/api`;
	},
	async fetch(request, init) {
		return getRequestEvent().fetch(request, init);
	}
});

const serverClient: AppRouterClient = createORPCClient(link);
globalThis.$client = serverClient;
