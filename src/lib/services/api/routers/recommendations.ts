import { getParsedMovies, movieSchema } from "$lib/services/parsers/movies.parser";
import { getParsedRatings } from "$lib/services/parsers/ratings.parser";
import { getParsedUsers } from "$lib/services/parsers/users.parser";
import { getEuclideanSimilarity } from "$lib/utils/euclidean-distance";
import z from "zod";
import { publicProcedure } from "..";

const userSimilarityOutputSchema = z.object({
	userId: z.number(),
	name: z.string(),
	similarity: z
		.object({
			userId: z.number(),
			name: z.string(),
			similarity: z.number()
		})
		.array()
});

export const recommendationsRouter = {
	userSimilarity: publicProcedure
		.route({ method: "GET" })
		.input(z.object({ userId: z.string(), amountOfUsers: z.string() }))
		.output(userSimilarityOutputSchema)
		.handler(async ({ input }) => {
			const selectedUserId = Number(input.userId);
			const amountOfUsers = Number(input.amountOfUsers);

			const users = await getParsedUsers();
			const allRatings = await getParsedRatings();
			const similarityList: { userId: number; name: string; similarity: number }[] = [];

			for (const user of users) {
				if (user.userId === selectedUserId) continue;

				const similarity = Number(
					getEuclideanSimilarity(allRatings, selectedUserId, user.userId).toFixed(4)
				);
				similarityList.push({ userId: user.userId, name: user.name, similarity });
			}

			const sortedSimilarityList = similarityList.sort((a, b) => b.similarity - a.similarity);

			return {
				userId: selectedUserId,
				name: users.find((user) => user.userId === selectedUserId)?.name ?? "",
				similarity: sortedSimilarityList.slice(0, amountOfUsers)
			};
		}),

	movieRecommendations: publicProcedure
		.route({ method: "GET" })
		.output(z.object({ movies: movieSchema.array() }))
		.handler(async () => {
			const firstUser = 7;
			const users = (await getParsedUsers()).filter((user) => {
				return user.userId !== firstUser;
			});

			const allRatings = await getParsedRatings();
			const similarityList: { userId: number; similarity: number }[] = [];

			for (const { userId } of users) {
				const similarity = getEuclideanSimilarity(allRatings, firstUser, userId);
				console.log(`${userId} similarity with Toby(7)`, similarity);
				similarityList.push({
					userId,
					similarity
				});
			}

			const highesSimilarity: { userid: number; similarity: number } = { userid: 0, similarity: 0 };

			for (const similarity of similarityList) {
				if (similarity.similarity > highesSimilarity.similarity) {
					highesSimilarity.userid = similarity.userId;
					highesSimilarity.similarity = similarity.similarity;
				}
			}

			console.log("highestSimilarity", highesSimilarity);

			const movies = await getParsedMovies();
			return { movies };
		})
};
