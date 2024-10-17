<script lang="ts">
    import { post_api_ping } from "$lib";
    let text: string = ""
    let ping_text: string = ""
    
    async function sendToBackend(): Promise<void> {
        ping_text = await post_api_ping(text);
    }
</script>

<h1>Skeleton Project</h1>
<input type="text" bind:value={text}>
<input type="button" value="enter" on:click={sendToBackend}>
ping from server = {ping_text}
