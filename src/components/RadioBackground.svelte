<script>
	export let backgroundFilePath;
	/**
	 * @type {string | null}
	 */
	 export let selectedBackground;

	const backgroundValue = backgroundFilePath
		.replace('../../static/backgrounds/', '')
		.replace('.jpg', '');
	const backgroundURL = backgroundFilePath.replace('../../static', '');

	const backgroundAlt = backgroundValue.replace(/-/g, ' ');
</script>

<div class="background-preview">
	<label>
		<input type="radio" name="background" value={backgroundValue} bind:group={selectedBackground} />
		<img src={backgroundURL} alt={backgroundAlt} />
		{backgroundAlt}
	</label>
</div>

<style>
	.background-preview label {
		text-transform: capitalize;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}

	.background-preview img {
		width: 100px;
		height: 100px;
		object-fit: cover;
		border-radius: 5px;
		margin: 5px auto;
	}
</style>
