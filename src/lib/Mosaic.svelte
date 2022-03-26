<script>
  import MosaicTile from './MosaicTile.svelte';
  import { getContext } from 'svelte';
  import Popup from './Popup.svelte';

  export let medias = [];

  const {open} = getContext('simple-modal');
  const showSurprise = () => open(Popup, {message: 'SUUUUUUUUUUUUU'});
</script>

<div class="mosaic">
    {#each medias as media}
        <MosaicTile on:click={showSurprise} {media}/>
    {/each}
</div>

<style>
    .mosaic {
        display: flex;
        flex-wrap: wrap;
    }
</style>