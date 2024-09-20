<script>
    import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'

    let coords = tweened(
		{ x: 50, y: 50 },
		{ duration: 200, easing: cubicOut }
	)

    let puck_coords = { x: 100, y: 100 }
    let velocity = { x: 10, y: 0 }

    setInterval(() => {
        puck_coords.x += velocity.x
        puck_coords.y += velocity.y
    }, 1000)

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg on:mousemove={(e) => coords.set({ x: e.clientX, y: e.clientY })}>
	<circle cx={$coords.x} cy={$coords.y} r=20/>
	<circle cx={puck_coords.x} cy={puck_coords.y} r=10/>
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
