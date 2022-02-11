<script>
  import Mosaic from './lib/Mosaic.svelte';

  const items = [];
  for (let i = 0; i < 20; i += 1) {
    items.push('https://api.lorem.space/image/movie?w=180&h=220');
  }
</script>

<main>
    <Mosaic {items}/>
</main>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    main {
        text-align: center;
        padding: 1em 20em;
        margin: 0 auto;
    }
</style>
