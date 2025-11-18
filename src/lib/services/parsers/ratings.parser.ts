import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";
import z from "zod";

export const ratingsSchema = z.object({
	userId: z.number(),
	movieId: z.number(),
	rating: z.number()
});
export type Rating = z.infer<typeof ratingsSchema>;

export const getParsedRatings = async (): Promise<Rating[]> => {
	const ratings: Rating[] = [];

	return new Promise((resolve, reject) => {
		fs.createReadStream(path.resolve("datasets", "movies", "ratings.csv"))
			.pipe(csv.parse({ headers: true, delimiter: ";" }))
			.on("error", (error) => reject(error))
			.on("data", (row: { UserId: string; MovieId: string; Rating: string }) => {
				const rating = ratingsSchema.parse({
					userId: Number(row.UserId),
					movieId: Number(row.MovieId),
					rating: Number(row.Rating)
				});
				ratings.push(rating);
			})
			.on("end", () => {
				resolve(ratings);
			});
	});
};
