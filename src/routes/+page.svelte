<script>
	import { fetchDaimoku, setDaimoku } from '$lib/api';
	import { onMount } from 'svelte';
	import Daimoku from '../components/Daimoku.svelte';

	let daimoku = 0;
	let inputNumber = 1


	/**
	 * @type {number | null}
	 */
	 let timer = null

	function fetchPolling() {
		fetchDaimoku().then(daimokuResponse => {
			daimoku = daimokuResponse || 0;
		})
	}

	onMount(() => {
		fetchPolling()
		timer = setInterval(fetchPolling, 3000)

		return () => {
			if (timer) {
				clearInterval(timer);
			}
		}
	})



	function addDaimoku() {
		setDaimoku(inputNumber)
		.then(daimokuResponse => {
			daimoku = daimokuResponse || 0;
		})
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		Conta Daimoku
	</h1>

	<Daimoku daimoku={daimoku} />

	<input type='number' bind:value={inputNumber} min="1" />
	<button type='button' on:click={addDaimoku}>Aggiungi Daimoku</button>
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

</style>
