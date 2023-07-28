<script>
	import { createEventDispatcher } from 'svelte'; 	
	import { onMount, onDestroy } from 'svelte';
	import DigitTweened from './DigitTweened.svelte';
	export let daimoku = 0;
	const dispatch = createEventDispatcher();
	
	/**
	 * @type {number | null}
	 */
	let timer = null;


	$: daimokuDigits = daimoku.toString().split('')


	onMount(() => {
		timer = setInterval(() => {
			daimoku += 1
	  }, 1000);
	})
	
	onDestroy(() => {
		if (timer) {
			clearInterval(timer);
		}
	})
	
	$: {
		if (daimoku === 0) {
			timer && clearInterval(timer);
			timer = null;
			dispatch('completed');
		}
	}
</script>

<style>

	
	ul {
		--height: 94px;
		display: inline-block;
		list-style: none;
		padding-left: 0;
		height: var(--height);
		overflow: hidden;
	}
</style>

<div>
	{#each daimokuDigits as digit}
		<ul>
			<DigitTweened digit={Number(digit)} />
		</ul>

	{/each}

</div>