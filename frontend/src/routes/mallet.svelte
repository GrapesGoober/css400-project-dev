<script>
    import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'

    export let coords = tweened(
		[50, 50],
		{ duration: 200, easing: cubicOut }
	)

    export let move_to
    $: move_to, coords.set(move_to)

</script>

<circle cx={$coords[0]} cy={$coords[1]} r=20/>

<style>
	circle {
		fill: #ff3e00;
	}
</style>
