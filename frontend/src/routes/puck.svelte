<script>
    import { tweened } from 'svelte/motion'
	import { linear } from 'svelte/easing'

	const DELTA_TIME = 200
    let velocity = [50, 10]

    let puck_coords = tweened(
		[50, 50],
		{ duration: DELTA_TIME, easing: linear }
	)

    setInterval(() => {
        puck_coords.set([
			$puck_coords[0] + velocity[0],
			$puck_coords[1] + velocity[1],
		])
    }, DELTA_TIME)

</script>

<circle cx={$puck_coords[0]} cy={$puck_coords[1]} r=10/>

<style>
	circle {
		fill: #ff3e00;
	}
</style>