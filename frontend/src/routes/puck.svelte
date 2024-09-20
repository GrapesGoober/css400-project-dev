<script>
    import { tweened } from 'svelte/motion'
	import { linear } from 'svelte/easing'

	export let width, height

	const DELTA_TIME = 200
    let velocity = [50, 10]

    let puck_coords = tweened(
		[0, 0],
		{ duration: DELTA_TIME, easing: linear }
	)

    setInterval(() => {
        puck_coords.set([
			$puck_coords[0] + velocity[0],
			$puck_coords[1] + velocity[1],
		])
    }, DELTA_TIME)

	// this wall detection isn't reliable due to high DELTA_TIME
	// however, the reactive check is as fast as the browser suppport, 
	// so the solution lies somewhere in setInterval and tweening
	$: if ($puck_coords[0] > width) {
		velocity[0] = -velocity[0]
	}
	$: if ($puck_coords[1] < 0 || $puck_coords[1] > height) {
		velocity[1] = -velocity[1]
	}
</script>

<circle cx={$puck_coords[0]} cy={$puck_coords[1]} r=10/>

<style>
	circle {
		fill: #ff3e00;
	}
</style>