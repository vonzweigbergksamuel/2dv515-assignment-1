import { getParsedUsers, usersSchema } from "$lib/services/parsers/users.parser";
import { publicProcedure } from "..";

export const usersRouter = {
	users: publicProcedure
		.route({ method: "GET" })
		.output(usersSchema.array())
		.handler(async () => {
			const users = await getParsedUsers();

			return users;
		})
};
