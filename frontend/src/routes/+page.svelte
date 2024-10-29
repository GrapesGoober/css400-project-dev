<script>
	import Puck from './puck.svelte';
	import Mallet from './mallet.svelte';
	import { Vector } from 'vecti'
	
	let mouse_pos = new Vector(50, 50)
	let width, height
	let mallet_pos = new Vector(0, 0)
	let mallet_velocity = new Vector(0, 0)

</script>

<!-- I believe there's a bind hell going on here... Svelte store? -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:clientWidth={width} bind:clientHeight={height}>
	<svg on:mousemove={(e) => mouse_pos = new Vector(e.clientX, e.clientY)}>
		<Mallet bind:move_to={mouse_pos} bind:coords={mallet_pos} bind:velocity={mallet_velocity}/>
		<Puck bind:width={width} bind:height={height} bind:mallet_pos={mallet_pos} bind:mallet_velocity={mallet_velocity}/>
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
