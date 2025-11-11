import z from "zod";
import { publicProcedure } from "..";

export const recommendationsRouter = {
	recommendations: publicProcedure
		.route({ method: "GET" })
		.output(z.object({ message: z.string() }))
		.handler(async () => {
			return { message: "Hello World" };
		})
};
