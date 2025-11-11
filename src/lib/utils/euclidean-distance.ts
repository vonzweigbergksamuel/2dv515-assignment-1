export interface Ratings {
	userId: number;
	movieId: number;
	rating: number;
}

export function calculateEuclideanDistance(
	user1Ratings: Ratings[],
	user2Ratings: Ratings[]
): number {
	const user1Map = new Map<number, number>();
	const user2Map = new Map<number, number>();

	for (const rating of user1Ratings) {
		user1Map.set(rating.movieId, rating.rating);
	}

	for (const rating of user2Ratings) {
		user2Map.set(rating.movieId, rating.rating);
	}

	let sumSquareDiff = 0;
	let commonMovies = 0;

	for (const [movieId, rating1] of user1Map) {
		const rating2 = user2Map.get(movieId);
		if (rating2 !== undefined) {
			sumSquareDiff += (rating1 - rating2) ** 2;
			commonMovies++;
		}
	}

	if (commonMovies === 0) {
		return 0;
	}

	// const distance = Math.sqrt(sumSquareDiff);
	const distance = sumSquareDiff;
	return 1 / (1 + distance);
}

export function getEuclideanSimilarity(allRatings: Ratings[], userId1: number, userId2: number) {
	const user1Ratings = allRatings.filter((rating) => {
		return rating.userId === userId1;
	});
	const user2Ratings = allRatings.filter((rating) => {
		return rating.userId === userId2;
	});

	return calculateEuclideanDistance(user1Ratings, user2Ratings);
}
