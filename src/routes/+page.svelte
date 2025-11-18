<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageProps } from "./$types";

	let { data, form }: PageProps = $props();
	let users = $derived(data?.users ?? []);

	let userSimilarity = $state(form?.userSimilarity);
	let movieRecommendations = $state(form?.movieRecommendations);

	$effect(() => {
		if (form?.userSimilarity) userSimilarity = form.userSimilarity;
		if (form?.movieRecommendations) movieRecommendations = form.movieRecommendations;
	});

	const similarUsers = $derived(userSimilarity?.similarity ?? []);
	const movieRecommendationsList = $derived(movieRecommendations ?? []);

	const amount = [1, 2, 3, 4, 5];
</script>

<main class="container !flex flex-col gap-8 py-4">
	<section>
		<h2>User Similarity</h2>
		<form method="post" action="?/userSimilarity" use:enhance class="grid">
			<select name="userId" required>
				<option value="">Select a user</option>
				{#each users as user}
					<option value={user.userId}>{user.name}</option>
				{/each}
			</select>
			<select name="amountOfUsers" required value={3}>
				<option value="">Select amount of users</option>
				{#each amount as amount}
					<option value={amount}>{amount}</option>
				{/each}
			</select>
			<button type="submit">Get Similar Users</button>
		</form>
		{#if similarUsers?.length && similarUsers?.length > 0}
			<table>
				<thead>
					<tr>
						<th>User ID</th>
						<th>Name</th>
						<th>Similarity</th>
					</tr>
				</thead>
				<tbody>
					{#each similarUsers as similarity}
						<tr>
							<td>{similarity.userId}</td>
							<td>{similarity.name}</td>
							<td>{similarity.similarity}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
		{#if similarUsers?.length === 0}
			<p>No similar users found</p>
		{/if}
		{#if form?.error}
			<p class="text-red-500!">{form?.error}</p>
		{/if}
	</section>

	<section>
		<h2>Movie Recommendations</h2>
		<form method="post" action="?/movieRecommendations" use:enhance class="grid">
			<select name="userId" required>
				<option value="">Select a user</option>
				{#each users as user}
					<option value={user.userId}>{user.name}</option>
				{/each}
			</select>
			<select name="amountOfMovies" required value={3}>
				<option value="">Select amount of movies</option>
				{#each amount as amount}
					<option value={amount}>{amount}</option>
				{/each}
			</select>
			<button type="submit">Get Recommendations</button>
		</form>
		{#if movieRecommendationsList?.length && movieRecommendationsList?.length > 0}
			<table>
				<thead>
					<tr>
						<th>Movie ID</th>
						<th>Title</th>
						<th>Year</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					{#each movieRecommendationsList as movie}
						<tr>
							<td>{movie.id}</td>
							<td>{movie.title}</td>
							<td>{movie.year}</td>
							<td>{movie.score}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
		{#if movieRecommendations?.length === 0}
			<p>No movie recommendations found</p>
		{/if}
		{#if form?.error}
			<p class="text-red-500!">{form?.error}</p>
		{/if}
	</section>
</main>
