import type { User } from "$lib/services/parsers/users.parser";
import { calculateEuclideanDistance, type Ratings } from "./euclidean-distance";

export function getRecommendedMovies(allRatings: Ratings[], userId: number, allUsers: User[]) {
	const ratingsByUser = new Map<number, Ratings[]>();
	for (const rating of allRatings) {
		const userRatings = ratingsByUser.get(rating.userId) ?? [];
		userRatings.push(rating);
		ratingsByUser.set(rating.userId, userRatings);
	}

	const userRatings = ratingsByUser.get(userId) ?? [];
	const similarityList = new Map<number, number>();
	for (const user of allUsers) {
		if (user.userId === userId) continue;
		const otherUserRatings = ratingsByUser.get(user.userId) ?? [];
		similarityList.set(user.userId, calculateEuclideanDistance(userRatings, otherUserRatings));
	}

	const sumOfWeightedScores = new Map<number, number>();
	const sumOfSimilarities = new Map<number, number>();
	for (const [otherUserId, similarity] of similarityList) {
		const otherUserRatings = ratingsByUser.get(otherUserId) ?? [];
		for (const rating of otherUserRatings) {
			sumOfWeightedScores.set(
				rating.movieId,
				(sumOfWeightedScores.get(rating.movieId) ?? 0) + rating.rating * similarity
			);
			sumOfSimilarities.set(
				rating.movieId,
				(sumOfSimilarities.get(rating.movieId) ?? 0) + similarity
			);
		}
	}

	const userRatedMovieIds = new Set(userRatings.map((rating) => rating.movieId));

	const averageWeightedScores: { movieId: number; score: number }[] = [];
	for (const [movieId, weightedScore] of sumOfWeightedScores) {
		if (!userRatedMovieIds.has(movieId)) {
			averageWeightedScores.push({
				movieId,
				score: weightedScore / (sumOfSimilarities.get(movieId) ?? 0)
			});
		}
	}
	averageWeightedScores.sort((a, b) => b.score - a.score);

	return averageWeightedScores;
}
