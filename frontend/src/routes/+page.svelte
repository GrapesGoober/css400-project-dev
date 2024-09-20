<script>
	import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'

    let coords = tweened(
		{ x: 50, y: 50 },
		{
			duration: 200,
			easing: cubicOut
		}
	)

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg on:mousemove={(e) => coords.set({ x: e.clientX, y: e.clientY })}>
	<circle cx={$coords.x} cy={$coords.y} r=10/>
</svg>

<style>
	svg {
		width: 100%;
		height: 80vh;
		margin: -8px;
	}
	circle {
		fill: #ff3e00;
	}
</style>
