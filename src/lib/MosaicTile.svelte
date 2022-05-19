<script>
  import { getContext } from 'svelte';
  import Popup from './Popup.svelte';

  export let media;

  const { open } = getContext('simple-modal');
  const openPopup = () => open(Popup, { media }, { styleWindow: { background: 'rgba(24,24,24,1)' } });
</script>

<img alt="thumbnail" class="mosaic-tile" on:click={openPopup} src={media.poster_small}>

<style>
    .mosaic-tile {
        max-width: 310px;
        max-height: 310px;
        margin: 1em;
        transition: 0.2s;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }

    .mosaic-tile:hover {
        box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.2);
    }
</style>
