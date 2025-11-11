import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export const parseMovies = () =>
	fs
		.createReadStream(path.resolve("datasets", "movies", "movies.csv"))
		.pipe(csv.parse({ headers: true }))
		.on("error", (error) => console.error(error))
		.on("data", (row) => console.log(row))
		.on("end", (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
