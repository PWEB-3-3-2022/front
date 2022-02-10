<script>
    export let item;
</script>

<div class="mosaic-tile">
    <img class="thumbnail" src={item} alt="thumbnail">
    <div class="mosaic-tile-details">
        <h4>title</h4>
        <span>year</span>
    </div>
</div>

<style>
    .mosaic-tile {
        margin: 1em;
        padding: 0em;
        background-color: darkgrey;
        border: thin solid #A0A0A0;
        border-radius: 4px;
        min-height: 4em;
        min-width: 4em;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
    }

    .mosaic-tile:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }

    .mosaic-tile-details {
        padding: 1em;
    }

    .thumbnail {
        /*max-width: 128px;*/
        /*max-height: 128px;*/
    }
</style>