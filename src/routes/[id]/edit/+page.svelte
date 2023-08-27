<script>
	import ContaDaimokuForm from "../../../components/ContaDaimokuForm.svelte";
	import { onMount } from 'svelte';

	/**
	 * @type {{ daimoku: number; id: string, info: { name: string; phrase: string; goal: string; background: string; };}}
	 */
	// @ts-ignore
	export let data;

</script>

<ContaDaimokuForm name={data.info.name} markdown={data.info.phrase} goal={parseInt(data.info.goal.replace(/,/g, ''))} code={data.id} editing={true} backgroundSelected={data.info.background}/>