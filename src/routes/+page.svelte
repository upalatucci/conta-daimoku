<script>
	import { enhance } from '$app/forms';
	import { fetchDaimoku } from '$lib/api';
	import debounce from 'lodash.debounce';

	/**
	 * @type {string | null}
	 */
	let code = null;

	let codeError = '';
	let codeEdited = false;

	let objective = 1_000_000;
	let stringObjective = objective.toLocaleString();

	const codeExists = debounce(() => {
		if (!code) return;
		fetchDaimoku(code).then((daimokuResponse) => {
			if (daimokuResponse) {
				codeError = "Un conta-daimoku con questo codice gia' esiste";
			}
		});
	}, 1000);

	$: if (code) {
		codeEdited = true;
		codeExists();
	}

	$: {
		stringObjective = stringObjective.replace(/[^0-9,]/g, '');
		objective = Number(stringObjective.replace(/[\,]/g, ''));

		if (Number.isNaN(objective)) {
			objective = 0;
			stringObjective = '0';
		}

		stringObjective = objective.toLocaleString();
	}
</script>

<section>
	<h1>Crea il tuo Conta Daimoku</h1>

	<form method="post" use:enhance>
		<label for="name">Titolo</label>
		<input type="text" placeholder="Titolo" name="name" required />

		<label for="phrase">Frase</label>
		<textarea name="phrase" placeholder="Frase" required />

		<label for="objective">Obiettivo di daimoku</label>
		<input
			type="text"
			placeholder="Obiettivo"
			name="objective"
			required
			bind:value={stringObjective}
		/>

		<label for="id">Codice</label>
		<input type="text" placeholder="Codice" name="id" required bind:value={code} />
		{#if codeError}
			<p class="code-error">{codeError}</p>
		{/if}
		<button type="submit">Crea</button>
	</form>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	form input,
	form textarea {
		width: 100%;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
		margin-bottom: 20px;
	}

	form button {
		width: 100%;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
		background-color: #ddd;
		cursor: pointer;
	}

	form button:hover {
		background-color: #ccc;
	}

	.code-error {
		color: red;
		margin-top: 0;
	}
</style>
