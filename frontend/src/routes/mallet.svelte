<script>
    import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	import { Vector } from 'vecti'

    export let coords = tweened(
		new Vector(0, 0),
		{ duration: 200, easing: cubicOut }
	)

    export let move_to
    $: move_to, coords.set(move_to)

</script>

<circle cx={$coords.x} cy={$coords.y} r=20/>

<style>
	circle {
		fill: #ff3e00;
	}
</style>
