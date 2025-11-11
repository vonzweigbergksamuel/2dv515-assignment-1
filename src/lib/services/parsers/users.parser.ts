import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";
import z from "zod";

export const usersSchema = z.object({
	userId: z.number(),
	name: z.string()
});
export type User = z.infer<typeof usersSchema>;

export const getParsedUsers = async (): Promise<User[]> => {
	const users: User[] = [];

	return new Promise((resolve, reject) => {
		fs.createReadStream(path.resolve("datasets", "movies", "users.example.csv"))
			.pipe(csv.parse({ headers: true, delimiter: ";" }))
			.on("error", (error) => reject(error))
			.on("data", (row: { UserId: string; Name: string }) => {
				const user = usersSchema.parse({
					userId: Number(row.UserId),
					name: row.Name
				});
				users.push(user);
			})
			.on("end", (rowCount: number) => {
				console.log(`Parsed ${rowCount} rows`);
				resolve(users);
			});
	});
};
