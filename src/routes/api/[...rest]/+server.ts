import { LoggingHandlerPlugin } from "@orpc/experimental-pino";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { CORSPlugin } from "@orpc/server/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import type { RequestHandler } from "@sveltejs/kit";
import { appRouter } from "$lib/services/api/routers";
import pino from "pino";

const logger = pino();

const openApiHandler = new OpenAPIHandler(appRouter, {
	plugins: [
		new CORSPlugin(),
		new OpenAPIReferencePlugin({
			schemaConverters: [new ZodToJsonSchemaConverter()]
		}),
		new LoggingHandlerPlugin({
			logger,
			generateId: () => crypto.randomUUID()
			// logRequestResponse: true,
			// logRequestAbort: true
		})
	],
	interceptors: [
		onError((error) => {
			console.error(error);
		})
	]
});

const rpcHandler = new RPCHandler(appRouter, {
	plugins: [
		new LoggingHandlerPlugin({
			logger,
			generateId: () => crypto.randomUUID()
			// logRequestResponse: true,
			// logRequestAbort: true
		})
	]
});

const handle: RequestHandler = async ({ request }) => {
	let { response } = await openApiHandler.handle(request, {
		prefix: "/api",
		context: {}
	});

	if (!response) {
		({ response } = await rpcHandler.handle(request, {
			prefix: "/api",
			context: {}
		}));
	}

	return response ?? new Response("Not Found", { status: 404 });
};

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
