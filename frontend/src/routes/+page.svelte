<script>
	import Puck from './puck.svelte';
	import Mallet from './mallet.svelte';

	let mallet_pos = [50, 50]
	let width, height

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:clientWidth={width} bind:clientHeight={height}>
	<svg on:mousemove={(e) => mallet_pos = [e.clientX, e.clientY]}>
		<Mallet bind:move_to={mallet_pos}/>
		<Puck bind:width={width} bind:height={height} bind:mallet_pos={mallet_pos}/>
	</svg>
</div>



<style>
	svg {
		width: 100%;
		height: 100%;
	}
	div {
		width: 100%;
		height: 80vh;
		margin: -8px;
	}
</style>
