<script>
    import { Modal } from 'svelte-simple-modal';
    import VideoPlayer from 'svelte-video-player';

    export let movie;
</script>

<head>
<style>
    body {
        background-color: white;
    }

    h1 {
        font-size: 2rem;
        text-align: left;
        color: black;
    }

    h2 {
        font-size: 1rem;
        color: #8c8c8c;
    }

    p {
        color: black;
    }
</style>
</head>

<body>
<VideoPlayer width="500"
             height="300"
             poster= {movie.poster_small}
             source= ''
             color = '#F00020'
             borderRadius = '0px'/>

<h1> {movie.title} </h1>

<h2> {movie.year} {movie.duration} </h2>

<p> {movie.description} </p>

</body>

