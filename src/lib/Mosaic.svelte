<script>
    import MosaicTile from "./MosaicTile.svelte";

    export let items = [];
</script>

<div class="mosaic">
    {#each items as item}
        <MosaicTile {item}/>
    {:else}
        <p>Loading ...</p>
    {/each}
</div>

<style>
    .mosaic {
        display: flex;
        flex-wrap: wrap;
    }
</style>