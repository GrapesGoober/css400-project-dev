<script lang="ts">
    let text: String = ""
    function sendToBackend(): void {
        console.log(text);
    }
</script>

<h1>Skeleton Project</h1>
<input type="text" bind:value={text}>
<input type="button" value="enter" on:click={sendToBackend}>
