import { getParsedMovies, movieSchema } from "$lib/services/parsers/movies.parser";
import z from "zod";
import { publicProcedure } from "..";

export const recommendationsRouter = {
	recommendations: publicProcedure
		.route({ method: "GET" })
		.output(z.object({ movies: movieSchema.array() }))
		.handler(async () => {
			const movies = await getParsedMovies();
			return { movies };
		})
};
