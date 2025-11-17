<script lang="ts">
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
	let users = $derived(data?.users ?? []);

	$inspect(data);
</script>

<main class="container">
	<section>
		<h1>Movie Recommendations</h1>
	</section>

	<section>
		<h2>User Similarity</h2>
		<form method="post" class="grid">
			<select name="userId">
				<option value="">Select a user</option>
				{#each users as user}
					<option value={user.userId}>{user.name}</option>
				{/each}
			</select>
			<select name="amountOfUsers">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
			<button type="submit">Submit</button>
		</form>
	</section>
</main>
