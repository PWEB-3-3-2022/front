<script>
  export let media;
</script>

<img alt="thumbnail" class="mosaic-tile" on:click src={media.poster}>

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
