<script>
	import Daimoku from '../components/Daimoku.svelte';

	let daimoku = 100

	let inputNumber = 1

	function addDaimoku() {
		daimoku += inputNumber
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
