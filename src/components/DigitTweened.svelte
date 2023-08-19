<script>
	import { afterUpdate } from 'svelte';
	import { tweened } from 'svelte/motion';
	export let digit = 0;
	

	const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reverse();

    let digitH = tweened((9 - Number(digit)), { duration: 300 })


	afterUpdate(() => {
        digitH.set((9 - Number(digit)), { duration: 300 })
	})
</script>

<style>

	.num {
    	font-size: var(--digit-height);
		--box-height: calc(var(--digit-height) + 14px);
		height: var(--box-height);
	}
</style>

<div>
    
	{#each numbers as num, i}
		<li class="num" style="transform: translateY(calc(-{$digitH} * var(--box-height) - 10px));">
			<span>{num}</span>
		</li>
    {/each}

</div>