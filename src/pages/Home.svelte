<script>
  import Mosaic from '../lib/Mosaic.svelte';

  const medias = [];
  for (let i = 0; i < 20; i += 1) {
    medias.push({ poster: 'https://api.lorem.space/image/movie?w=180&h=220' });
  }
</script>

<main>
    <Mosaic {medias}/>
</main>

<style>
    main {
        text-align: center;
        padding: 1em 20em;
        margin: 0 auto;
    }
</style>
