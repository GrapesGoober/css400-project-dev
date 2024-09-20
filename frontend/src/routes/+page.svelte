<script>
	import Puck from './puck.svelte';
	import Mallet from './mallet.svelte';

	let mallet_pos = [50, 50]

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg on:mousemove={(e) => mallet_pos = [e.clientX, e.clientY]}>
	<Mallet bind:move_to={mallet_pos}/>
	<Puck/>
</svg>

<style>
	svg {
		width: 100%;
		height: 80vh;
		margin: -8px;
	}
</style>
