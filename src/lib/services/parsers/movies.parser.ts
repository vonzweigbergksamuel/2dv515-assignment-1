import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";
import z from "zod";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export const movieSchema = z.object({
	id: z.number(),
	title: z.string(),
	year: z.number()
});
export type Movie = z.infer<typeof movieSchema>;

export const getParsedMovies = (): Promise<Movie[]> => {
	const movies: Movie[] = [];

	return new Promise((resolve, reject) => {
		fs.createReadStream(path.resolve("datasets", "movies", "movies.example.csv"))
			.pipe(csv.parse({ headers: true, delimiter: ";" }))
			.on("error", (error) => reject(error))
			.on("data", (row: { MovieId: string; Title: string; Year: string }) => {
				const movie = movieSchema.parse({
					id: Number(row.MovieId),
					title: row.Title,
					year: Number(row.Year)
				});
				movies.push(movie);
			})
			.on("end", (rowCount: number) => {
				console.log(`Parsed ${rowCount} rows`);
				resolve(movies);
			});
	});
};
