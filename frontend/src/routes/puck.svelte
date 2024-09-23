<script>
    import { tweened } from 'svelte/motion'
	import { linear } from 'svelte/easing'
	import add from 'vectors/add-nd'
	import dist from 'vectors/dist-nd'
	import cop from 'vectors/copy-nd'
	import sub from 'vectors/sub-nd'
	import div from 'vectors/div-nd'

	export let width, height, mallet_pos

	const DELTA_TIME = 10
	const MALLET_RADIUS = 20
	const PUCK_RADIUS = 10

    let velocity = [5, 1]

    let puck_coords = [0, 0]

    setInterval(() => {
		add(puck_coords, velocity)
		puck_coords = puck_coords
    }, DELTA_TIME)

	$: if (puck_coords[0] > width || puck_coords[0] < 0) {
		velocity[0] = -velocity[0]
	}
	$: if (puck_coords[1] < 0 || puck_coords[1] > height) {
		velocity[1] = -velocity[1]
	}
	$: if (dist(puck_coords, mallet_pos) < MALLET_RADIUS + PUCK_RADIUS) {
		let delta = cop(puck_coords)
		sub(delta, mallet_pos)
		div(delta, 10)
		velocity = cop(delta)
	}
</script>

<circle cx={puck_coords[0]} cy={puck_coords[1]} r={PUCK_RADIUS}/>

<style>
	circle {
		fill: #ff3e00;
	}
</style>