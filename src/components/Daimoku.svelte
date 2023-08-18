<script>
	import DigitTweened from './DigitTweened.svelte';
	export let daimoku = 0;

	$: daimokuDigits = daimoku?.toString()?.split('');
</script>

<div class="daimoku-container">
	{#each daimokuDigits as digit}
		<ul>
			<DigitTweened digit={Number(digit)} />
		</ul>
	{/each}
</div>

<style>
	.daimoku-container {
		max-width: 100%;
	}
	ul {
		--digit-height: 94px;
		display: inline-block;
		list-style: none;
		padding-left: 0;
		height: var(--digit-height);
		overflow: hidden;
	}
</style>
