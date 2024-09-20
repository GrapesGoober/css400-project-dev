<script>
    import { tweened } from 'svelte/motion'
	import { linear } from 'svelte/easing'

	const DELTA_TIME = 200
    let velocity = { x: 50, y: 10 }

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

<circle cx={$puck_coords.x} cy={$puck_coords.y} r=10/>

<style>
	circle {
		fill: #ff3e00;
	}
</style>