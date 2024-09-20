<script>
    import { tweened } from 'svelte/motion'
	import { cubicOut, linear } from 'svelte/easing'

    let coords = tweened(
		{ x: 50, y: 50 },
		{ duration: 200, easing: cubicOut }
	)

    let velocity = { x: 50, y: 10 }

	const DELTA_TIME = 200

    let puck_coords = tweened(
		{ x: 100, y: 100 },
		{ duration: DELTA_TIME, easing: linear }
	)

    setInterval(() => {
        puck_coords.set({
			x: $puck_coords.x + velocity.x,
			y: $puck_coords.y + velocity.y
		})
    }, DELTA_TIME)

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg on:mousemove={(e) => coords.set({ x: e.clientX, y: e.clientY })}>
	<circle cx={$coords.x} cy={$coords.y} r=20/>
	<circle cx={$puck_coords.x} cy={$puck_coords.y} r=10/>
</svg>

<style>
	svg {
		width: 100%;
		height: 80vh;
		margin: -8px;
	}
	circle {
		fill: #ff3e00;
	}
</style>
