<script>
	import { Vector } from 'vecti'

	export let coords = new Vector(0, 0)
	export let velocity = new Vector(0, 0)

	const DELTA_TIME = 10
	// use requestAnimationFrame function would be good
	// also, abstract "circle" into a component? so you can bind "other" circle?
	setInterval(() => {
		coords = coords.add(velocity)
    }, DELTA_TIME)

    export let move_to
    $: {
		velocity = move_to.subtract(coords).divide(10)
	}

</script>

<circle cx={coords.x} cy={coords.y} r=20/>

<style>
	circle {
		fill: #ff3e00;
	}
</style>
