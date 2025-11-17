import { orpc } from "$lib/orpc";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	const users = await orpc.users.call();

	return {
		users
	};
};
