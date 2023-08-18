<script>
	export let backgroundFilePath;

	const backgroundValue = backgroundFilePath
		.replace('../../static/backgrounds/', '')
		.replace('.jpg', '');
	const backgroundURL = backgroundFilePath.replace('../../static', '');

	const backgroundAlt = backgroundValue.replace(/-/g, ' ');
</script>

<div class="background-preview">
	<label>
		{backgroundAlt}
		<input type="radio" name="background" value={backgroundValue} />
		<img src={backgroundURL} alt={backgroundAlt} />
	</label>
</div>

<style>
	.background-preview label {
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
