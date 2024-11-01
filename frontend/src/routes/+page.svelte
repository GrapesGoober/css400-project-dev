<script lang="ts">
    import { Mallet,OpponentMallet, postGameState, Puck } from '$lib';
    import { onMount } from 'svelte';
	import { Vector } from 'vecti'
	
	let width: number, height: number;
	let mousePos = new Vector(0, 0);

	let mallet = new Mallet();
	let puck = new Puck();
	let opponentMallet = new OpponentMallet();
	puck.position = new Vector(100,100);

	let prev_timestamp: number = 0
	function update(timestamp: number) {
		requestAnimationFrame(update);
		let dt: number = (timestamp - prev_timestamp) / 1000;
		prev_timestamp = timestamp;

		// control mallet
		mallet.acceleratTowards(mousePos);

		// Move opponent mallet towards puck position
        opponentMallet.moveTowards(puck.position);

		// have puck check collision
		puck.resolveWallCollision(width, height);
		puck.resolveMalletCollision(mallet);
		puck.resolveMalletCollision(opponentMallet);

		// update their positions
		 mallet.restrictedUpdatePosition(dt, width, height);
		puck.updatePosition(dt);
		opponentMallet.restrictedUpdatePosition(dt, width, height);
		
		// force svelte to recognize changes
		mallet = mallet;
		puck = puck;
		opponentMallet = opponentMallet;
	}

	onMount(() => {
		console.log("Width:", width, "Height:", height);
		opponentMallet.position = new Vector(width - 50, height / 2); 
		requestAnimationFrame(update);
		
		
		// send gameplay record
		const INTERVAL = 100;
		setInterval(() => {
			postGameState(mallet, puck);
		}, INTERVAL);
	});

</script>

<!-- I believe there's a bind hell going on here... Svelte store? -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:clientWidth={width} bind:clientHeight={height}>
	<svg 
	on:mousemove={(e) => mousePos = new Vector(e.clientX, e.clientY)}
	on:touchmove={(e) => mousePos = new Vector(e.touches[0].clientX, e.touches[0].clientY)}>
		<circle cx={mallet.position.x} cy={mallet.position.y} r={mallet.radius}/>
		<circle cx={puck.position.x} cy={puck.position.y} r={puck.radius} fill="green" />
		<circle cx={opponentMallet.position.x} cy={opponentMallet.position.y} r={opponentMallet.radius} fill="blue" />
		<rect x={width / 2 - 2.5} y="0" width="5" height={height} fill="grey" />
	</svg>
</div>

<style>
	circle {
		fill: #ff3e00;
	}
	circle[fill="blue"] {
        fill: blue;
    }
	circle[fill="green"] {
        fill: green;
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
