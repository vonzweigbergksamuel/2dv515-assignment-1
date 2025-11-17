<script lang="ts">
	import type { PageProps } from "./$types";

	let { data, form }: PageProps = $props();
	let users = $derived(data?.users ?? []);

	const amount = [1, 2, 3, 4, 5];
</script>

<main class="container !flex flex-col gap-8 py-10">
	<h1>Movie Recommendations</h1>

	<section>
		<h2>User Similarity</h2>
		<form method="post" action="?/userSimilarity" class="grid">
			<select name="userId" required>
				<option value="">Select a user</option>
				{#each users as user}
					<option value={user.userId}>{user.name}</option>
				{/each}
			</select>
			<select name="amountOfUsers">
				{#each amount as amount}
					<option value={amount}>{amount}</option>
				{/each}
			</select>
			<button type="submit">Get Similar Users</button>
		</form>
		{#if form?.userSimilarity?.similarity?.length && form?.userSimilarity?.similarity?.length > 0}
			<table>
				<thead>
					<tr>
						<th>User</th>
						<th>User ID</th>
						<th>Similarity</th>
					</tr>
				</thead>
				<tbody>
					{#each form?.userSimilarity.similarity as similarity}
						<tr>
							<td>{similarity.name}</td>
							<td>{similarity.userId}</td>
							<td>{similarity.similarity}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
		{#if form?.error}
			<p class="text-red-500!">{form?.error}</p>
		{/if}
	</section>

	<section>
		<h2>Movie Recommendations</h2>
		<form method="post" action="?/movieRecommendations" class="grid">
			<select name="userId" required>
				<option value="">Select a user</option>
				{#each users as user}
					<option value={user.userId}>{user.name}</option>
				{/each}
			</select>
			<select name="amountOfMovies">
				{#each amount as amount}
					<option value={amount}>{amount}</option>
				{/each}
			</select>
			<button type="submit">Get Recommendations</button>
		</form>
	</section>
</main>
