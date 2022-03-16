<script>
  import { querystring } from 'svelte-spa-router';
  import Mosaic from '../lib/Mosaic.svelte';

  // Parse query string parameters everytime they change
  $: params = new URLSearchParams($querystring);

  const items = [];
  for (let i = 0; i < 4; i += 1) {
    items.push('https://api.lorem.space/image/movie?w=180&h=220');
  }
</script>

<main>
    <span>Results for "{params.get('query')}"</span>
    <Mosaic {items}/>
</main>
