<script>
  import MosaicTile from './MosaicTile.svelte';

  export let medias = [];
</script>

<div class="mosaic">
    {#each medias as media}
        <MosaicTile {media}/>
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