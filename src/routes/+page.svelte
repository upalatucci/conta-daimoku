<script>
	import { enhance } from '$app/forms';
	import { fetchDaimoku } from '$lib/api';
	import debounce from 'lodash.debounce';
	import RadioBackground from '../components/RadioBackground.svelte';
    import Editor from '../../node_modules/bytemd/svelte/editor.svelte';
	import 'bytemd/dist/index.css'


	const backgrounds = import.meta.glob('../../static/backgrounds/*');

	/**
	 * @type {string | null}
	 */
	let code = null;
	let name = '';

	let codeError = '';
	let markdown = '#test'

	let goal = 1_000_000;
	let stringGoal = goal.toLocaleString();

	const codeExists = debounce(() => {
		if (!code) return;
		fetchDaimoku(code).then((daimokuResponse) => {
			codeError = daimokuResponse ? "Un conta-daimoku con questo codice gia' esiste" : '';
		});
	}, 1000);

	$: if (code) {
		codeExists();
	}

	$: if (name) {
		code = name
			.replace(/ /g, '-')
			.replace(/[^a-zA-Z0-9-]/g, '')
			.toLowerCase();
	}

	$: {
		stringGoal = stringGoal.replace(/[^0-9,]/g, '');
		goal = Number(stringGoal.replace(/[\,]/g, ''));

		if (Number.isNaN(goal)) {
			goal = 0;
			stringGoal = '0';
		}

		stringGoal = goal.toLocaleString();
	}


	/**
	 * @param {{ detail: { value: string; }; }} e
	 */
	function handleChange(e) {
		markdown = e.detail.value
	}
</script>

<section>
	<h1>Crea il tuo Conta Daimoku</h1>

	<form method="post" use:enhance>
		<label for="name">Titolo</label>
		<input type="text" placeholder="Titolo" name="name" required bind:value={name} />

		<label for="phrase">Frase</label>

		<div class="editor-container">
		<Editor value={markdown} on:change={handleChange} />
	</div>
		<textarea name='phrase' value={markdown} />

		<label for="goal">Obiettivo di daimoku</label>
		<input
			type="text"
			placeholder="Obiettivo"
			name="goal"
			required
			bind:value={stringGoal}
		/>

		<label for="id">Codice</label>
		<input type="text" placeholder="Codice" name="id" required bind:value={code} />
		{#if codeError}
			<p class="code-error">{codeError}</p>
		{/if}

		<div class="backgrounds">
			<div class="backgrounds-title">Immagine</div>
			<div class="backgrounds-radio">
				{#each Object.keys(backgrounds) as background}
					<RadioBackground backgroundFilePath={background} />
				{/each}
			</div>
		</div>
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

	form textarea {
		display: none;
	}

	

	form input {
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

	.backgrounds {
		margin-bottom: 1rem;
	}

	.backgrounds-title {
		text-align: center;
	}

	.backgrounds-radio {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.backgrounds > div {
		margin: 10px;
	}

	.editor-container {
		margin: 10px 0 20px;
		width: 100%;
	}
</style>
