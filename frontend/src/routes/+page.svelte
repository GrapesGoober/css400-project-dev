<script lang="ts">
    import { Mallet, Puck } from '$lib';
    import { onMount } from 'svelte';
	import { Vector } from 'vecti'
	
	let width: number, height: number;
	let mousePos = new Vector(0, 0);

	let mallet = new Mallet();
	let puck = new Puck();
	puck.position = new Vector(100,100);

	let prev_timestamp: number = 0
	function update(timestamp: number) {
		requestAnimationFrame(update);
		let dt: number = (timestamp - prev_timestamp) / 1000;
		prev_timestamp = timestamp;

		// control mallet
		mallet.accelerate_towards(mousePos);

		// have puck check collision
		puck.resolve_wall_collision(width, height);
		puck.resolve_mallet_collision(mallet);

		// update their positions
		mallet.update_position(dt);
		puck.update_position(dt);
		
		// force svelte to recognize changes
		mallet = mallet;
		puck = puck;
	}

	onMount(() => {
		requestAnimationFrame(update);
	});

</script>

<!-- I believe there's a bind hell going on here... Svelte store? -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:clientWidth={width} bind:clientHeight={height}>
	<svg 
	on:mousemove={(e) => mousePos = new Vector(e.clientX, e.clientY)}
	on:touchmove={(e) => mousePos = new Vector(e.touches[0].clientX, e.touches[0].clientY)}>
		<circle cx={mallet.position.x} cy={mallet.position.y} r={mallet.radius}/>
		<circle cx={puck.position.x} cy={puck.position.y} r={puck.radius}/>
	</svg>
</div>

<style>
	circle {
		fill: #ff3e00;
	}
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
