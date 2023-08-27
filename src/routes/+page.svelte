<script>
	import { getEditURL } from "$lib/utils";
	import ContaDaimokuForm from "../components/ContaDaimokuForm.svelte";

	/**
	 * @param {any} event
	 */
	function onSubmit(event) {
		const formData = new FormData(event.target);

		const id = formData.get('id')
		const editCode = formData.get('editCode')

		if (!id || !editCode) return 

		const editUrl = getEditURL(id.toString(), editCode.toString())

		if (!editUrl) return


		localStorage.setItem(id.toString(), editUrl);

	}
</script>

<ContaDaimokuForm onsubmit={onSubmit} />