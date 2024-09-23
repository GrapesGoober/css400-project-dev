<script>
    import { tweened } from 'svelte/motion'
	import { linear } from 'svelte/easing'
	import add from 'vectors/add-nd'
	import cop from 'vectors/copy-nd'

	export let width, height

	const DELTA_TIME = 200
    let velocity = [50, 10]

    let puck_coords = tweened(
		[0, 0],
		{ duration: DELTA_TIME, easing: linear }
	)

    setInterval(() => {
		let new_coords = cop($puck_coords)
		add(new_coords, velocity)
        puck_coords.set(new_coords)
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