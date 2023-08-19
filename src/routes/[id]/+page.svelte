<script>
	import { fetchDaimoku, setDaimoku } from '$lib/api';
	import { onMount } from 'svelte';
	import Daimoku from '../../components/Daimoku.svelte';
	import BackgroundProgress from '../../components/BackgroundProgress.svelte';
	import JSConfetti from 'js-confetti'
    import Viewer from '../../../node_modules/bytemd/svelte/viewer.svelte';



	/**
	 * @type {{ daimoku: number; id: string, info: { name: string; phrase: string; goal: string; background: string; };}}
	 */
	// @ts-ignore
	export let data;

	let progressBasePoint = 0

	$: daimoku = data.daimoku;

	$: if (data.info?.goal) {
		progressBasePoint = Math.trunc(
			(daimoku / Number(data.info.goal.replace(/,/g, ''))) * 10000
		);
	}

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

	$: if (progressBasePoint >= 10_000 && globalThis.window) {

		const jsConfetti = new JSConfetti()
		jsConfetti.addConfetti()

	}
</script>

<svelte:head>
	<title>{data.info?.name}</title>
	<meta name="description" content={data.info?.phrase} />
</svelte:head>

<section>
	{#if daimoku !== null}
		<h1>{data.info.name}</h1>

		<div class="markdown-container">
			<Viewer value={data.info.phrase} />
		</div>
		<p>Obiettivo: {data.info.goal} di daimoku</p>

		<BackgroundProgress background={data.info.background} {progressBasePoint} />
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
		margin-bottom: 0.5rem;
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


	.markdown-container {
		width: 100%;
		max-width: 400px;
	}
</style>
