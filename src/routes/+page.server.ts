import { fail } from "@sveltejs/kit";
import { orpc } from "$lib/orpc";
import type { Actions } from "./$types";

export const actions = {
	userSimilarity: async ({ request }) => {
		try {
			const formData = await request.formData();
			const userId = formData.get("userId");
			const amountOfUsers = formData.get("amountOfUsers");

			const userSimilarity = await orpc.userSimilarity.call({
				userId: String(userId),
				amountOfUsers: String(amountOfUsers)
			});

			return {
				userSimilarity
			};
		} catch (error) {
			console.error(error);
			return fail(500, { error: "Failed to get user similarity" });
		}
	},
	movieRecommendations: async ({ request }) => {
		try {
			const formData = await request.formData();
			const userId = formData.get("userId");
			const amountOfMovies = formData.get("amountOfMovies") || "3";

			if (!userId) {
				return fail(400, { error: "User ID is required" });
			}

			const movieRecommendations = await orpc.movieRecommendations.call({
				userId: String(userId),
				amountOfMovies: String(amountOfMovies)
			});

			return {
				movieRecommendations
			};
		} catch (error) {
			console.error(error);
			return fail(500, { error: "Failed to get movie recommendations" });
		}
	}
} satisfies Actions;
