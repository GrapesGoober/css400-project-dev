<script>
	import { Vector } from 'vecti'

	export let width, height, mallet_pos

	const DELTA_TIME = 10
	const MALLET_RADIUS = 20
	const PUCK_RADIUS = 10

    let velocity = new Vector(5, 1)
    let puck_coords = new Vector(0, 0)

    setInterval(() => {
		puck_coords = puck_coords.add(velocity)
    }, DELTA_TIME)

	$: if (puck_coords.x > width || puck_coords.x < 0) {
		velocity = velocity.hadamard(new Vector(-1, 1))
	}
	$: if (puck_coords.y < 0 || puck_coords.y > height) {
		velocity = velocity.hadamard(new Vector(1, -1))
	}
	$: if (puck_coords.subtract(mallet_pos).length() < MALLET_RADIUS + PUCK_RADIUS) {
		let delta = puck_coords.subtract(mallet_pos)
		velocity = delta.divide(5)
	}
</script>

<circle cx={puck_coords.x} cy={puck_coords.y} r={PUCK_RADIUS}/>

<style>
	circle {
		fill: #ff3e00;
	}
</style>