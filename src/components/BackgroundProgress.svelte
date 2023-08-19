<script>
	export let background = '';
	export let progressBasePoint = 0;

	$: progress = progressBasePoint / 100;

	// const progressBoxes = new Array(10_000).fill(0).map((_, i) => i + 1);
</script>

<div class="background-progress">
	<img src={`backgrounds/${background}.jpg`} alt={background} />
	<div
		class="progress"
		style={`background: linear-gradient(to bottom right, #eeaeca00 0%, #eeaeca00 ${
			progress - 10
		}%, #eeaecaff ${progress}%, #c6b4d8 ${progress + 20}%, #94bbe9 ${
			progress + 30
		}%,  #94bbe9 100%);`}
	>
		<!-- {#each progressBoxes as progressBox}
			<div class="progress-box" class:active={progressBox <= progressBasePoint}  />
		{/each} -->
	</div>
</div>

<style>
	img {
		max-height: 50vh;
		max-width: 100%;
	}

	.background-progress {
		position: relative;
	}

	.progress {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.progress-box {
		border: 1px solid gray;
		background-color: gray;
		width: 1%;
		height: 1%;
		float: left;
		box-sizing: border-box;
	}

	.progress-box.active {
		border: none;
		background-color: transparent;
	}
</style>
