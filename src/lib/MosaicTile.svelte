<script>
  export let media;
</script>

<img alt="thumbnail" class="mosaic-tile" src={media.poster}>


<style>
    .mosaic-tile {
        margin: 1em;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.2s;
        max-width: 310px;
        max-height: 310px;
    }

    .mosaic-tile:hover {
        box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.2);
    }
</style>