<script lang="ts">
	import { Vector } from 'vecti'

	export let width, height, mallet_pos

	const DELTA_TIME = 10
	const MALLET_RADIUS = 20
	const PUCK_RADIUS = 10

    let velocity = new Vector(0, 0)
    let puck_coords = new Vector(100, 100)
	export let mallet_velocity = new Vector(0, 0)

	// use requestAnimationFrame function would be good
    setInterval(() => {
		puck_coords = puck_coords.add(velocity)
    }, DELTA_TIME)

	$: if (puck_coords.x > width || puck_coords.x < 0) {
		velocity = velocity.hadamard(new Vector(-1, 1))
	}
	$: if (puck_coords.y < 0 || puck_coords.y > height) {
		velocity = velocity.hadamard(new Vector(1, -1))
	}

	$: {
		let delta_pos: Vector = puck_coords.subtract(mallet_pos)
		if (delta_pos.length() < MALLET_RADIUS + PUCK_RADIUS) {
			// calculate adjustment vector to move puck away from mallet
			let target_vector = delta_pos
				.normalize()
				.multiply(MALLET_RADIUS + PUCK_RADIUS)
			let move_vector = target_vector.subtract(delta_pos)
			puck_coords = puck_coords.add(move_vector)
			// apply velocity
			let delta_v = mallet_velocity.subtract(velocity)
			velocity = velocity.add(delta_v)
		}
	}
</script>

<circle cx={puck_coords.x} cy={puck_coords.y} r={PUCK_RADIUS}/>

<style>
	circle {
		fill: #ff3e00;
	}
</style>