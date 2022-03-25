<script>
  import MosaicTile from './MosaicTile.svelte';

  export let medias = [];
</script>

<div class="mosaic">
    {#each medias as media}
        <MosaicTile {media}/>
    {/each}
</div>

<style>
    .mosaic {
        display: flex;
        flex-wrap: wrap;
    }
</style>