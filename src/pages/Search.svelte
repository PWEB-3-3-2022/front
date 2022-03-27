<script>
  import { querystring } from 'svelte-spa-router';
  import { derived } from 'svelte/store';
  import Mosaic from '../lib/Mosaic.svelte';
  import { searchMedias } from '../api';

  let query = new URLSearchParams($querystring).get('query');
  // Parse query string parameters everytime they change
  const searchResults = derived(querystring, (querystring_, set) => {
    query = new URLSearchParams(querystring_).get('query');
    if (query !== '') {
      searchMedias(query).then(set).catch((e) => console.log(`Failed to search for medias : ${e}`));
    }
  });
</script>

<div id="main">
    {#if query === ''}
        <h1>Search for medias with the search bar ^</h1>
    {:else}
        <h1>Search results for "{query}"</h1>
        <Mosaic medias={$searchResults}/>
    {/if}
</div>

<style>
    #main {
        margin: 10px;
    }

    h1 {
        font-size: 30px;
        margin-left: 1em;
    }
</style>