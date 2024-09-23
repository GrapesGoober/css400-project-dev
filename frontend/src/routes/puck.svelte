<script>
    import { tweened } from 'svelte/motion'
	import { linear } from 'svelte/easing'
	import add from 'vectors/add-nd'
	import cop from 'vectors/copy-nd'

	export let width, height

	const DELTA_TIME = 10
    let velocity = [5, 1]

    let puck_coords = [0, 0]

    setInterval(() => {
		add(puck_coords, velocity)
		puck_coords = puck_coords
    }, DELTA_TIME)

	$: if (puck_coords[0] > width) {
		console.log("hit")
		velocity[0] = -velocity[0]
	}
	$: if (puck_coords[1] < 0 || puck_coords[1] > height) {
		velocity[1] = -velocity[1]
	}
</script>

<circle cx={puck_coords[0]} cy={puck_coords[1]} r=10/>

<style>
	circle {
		fill: #ff3e00;
	}
</style>