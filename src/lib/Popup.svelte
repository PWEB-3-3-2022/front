<script>
    import { Player, Video, DefaultUi } from '@vime/svelte';

    export let movie;
</script>

<Player>
    <Video crossOrigin="" poster={movie.poster_small}>
        <source data-src="https://media.vimejs.com/720p.mp4" type="video/mp4">
    </Video>

    <DefaultUi>
    </DefaultUi>
</Player>

<h1>{movie.title}</h1>

<h2>{movie.year} {movie.duration}</h2>

<p>{movie.description}</p>

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