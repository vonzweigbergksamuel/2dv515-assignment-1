import { getParsedMovies, movieSchema } from "$lib/services/parsers/movies.parser";
import { getParsedRatings } from "$lib/services/parsers/ratings.parser";
import { getParsedUsers } from "$lib/services/parsers/users.parser";
import { getEuclideanSimilarity } from "$lib/utils/euclidean-distance";
import z from "zod";
import { publicProcedure } from "..";

export const recommendationsRouter = {
	recommendations: publicProcedure
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
