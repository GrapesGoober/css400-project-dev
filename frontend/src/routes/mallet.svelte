<script>
    import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'

    export let coords = tweened(
		{ x: 50, y: 50 },
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
