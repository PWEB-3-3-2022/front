<script>
  import { DefaultUi, Player, Video } from '@vime/svelte';
  import { playMedia } from '../api.js';

  export let media;

  const mediaSrc = playMedia(media._id).then((res) => res.src);
</script>

{#await mediaSrc}
    <p>Loading ...</p>
{:then src}
    <Player>
        <Video crossOrigin poster={media.poster_small} mediaTitle={media.title}>
            <source data-src={src} type="video/mp4">
        </Video>

        <DefaultUi>
        </DefaultUi>
    </Player>
{:catch err}
    <p style="color: red">Can't load media : {err}</p>
{/await}
<h1>{media.title}</h1>
<h2>{media.year} {media.duration}</h2>
<p>{media.description}</p>

<style>
    h1 {
        font-size: 2rem;
        text-align: left;
        color: white;
    }

    h2 {
        font-size: 1rem;
        color: #8c8c8c;
    }

    p {
        color: white;
    }
</style>