<script>
  import { querystring } from 'svelte-spa-router';
  import { derived } from 'svelte/store';
  import Mosaic from '../lib/Mosaic.svelte';
  import { searchMedias } from '../api';

  let query = new URLSearchParams($querystring).get('query');
  // Parse query string parameters everytime they change
  const searchResults = derived(querystring, (querystring_, set) => {
    query = new URLSearchParams(querystring_).get('query');
    searchMedias(query).then(set).catch((e) => console.log(`Failed to search for medias : ${e}`));
  });
</script>

<main>
    <span>Results for "{query}"</span>
    <Mosaic medias={$searchResults}/>
</main>
