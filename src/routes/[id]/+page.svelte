<script>
	import { fetchDaimoku, setDaimoku } from '$lib/api';
	import { onMount } from 'svelte';
	import Daimoku from '../../components/Daimoku.svelte';

	/**
	 * @type {{ daimoku: number; id: string }}
	 */
	export let data;
	$: daimoku = data.daimoku
	let inputNumber = 1;

	/**
	 * @type {number | null}
	 */
	let timer = null;

	function fetchPolling() {
		fetchDaimoku(data.id).then((daimokuResponse) => {
			daimoku = daimokuResponse;
		});
	}

	onMount(() => {
		timer = setInterval(fetchPolling, 3000);

		return () => {
			if (timer) {
				clearInterval(timer);
			}
		};
	});

	function addDaimoku() {
		setDaimoku(data.id, inputNumber).then((daimokuResponse) => {
			daimoku = daimokuResponse;
		});
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#if daimoku !== null }
		<h1>Conta Daimoku</h1>
		<Daimoku {daimoku} />

		<form>
			<input type="number" bind:value={inputNumber} min="1" />
			<button type="button" on:click={addDaimoku}>Aggiungi Daimoku</button>
		</form>
	{:else}
		<h1>Il Conta Daimoku <strong>{data.id}</strong> non esiste</h1>
		<a href="/prova">Crealo!</a>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 1rem;
		gap: 1rem;
	}

	form button {
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		border: 1px solid #ccc;
		background-color: #fff;
		width: 100%;
	}

	form input {
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		border: 1px solid #ccc;
		background-color: #fff;
	}
</style>
