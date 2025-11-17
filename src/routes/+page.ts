import { client } from "$lib/orpc";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	const users = await client.users();

	console.log("users", users);

	return {
		users
	};
};
