<script>
	import Puck from './puck.svelte';
	import Mallet from './mallet.svelte';

	let mallet_pos = { x: 50, y: 50 }

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg on:mousemove={(e) => mallet_pos = { x: e.clientX, y: e.clientY }}>
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
