<script>
  import { push } from 'svelte-spa-router';

  let query = '';

  function onSearch(e) {
    e.preventDefault();
    push(`/search?query=${query}`);
  }

  function onKeyUp() {
    push(`/search?query=${query}`);
  }
</script>

<form on:submit={onSearch}>
    <input type="text" id="search-input" bind:value={query} on:keyup={onKeyUp} name="query" placeholder="Search...">
</form>

<style>
    #search-input {
        background-image: url("https://img.icons8.com/ios-glyphs/30/000000/search--v1.png");
        background-repeat: no-repeat;
        text-decoration: none;
        padding-left: 30px;
        width: 300px;
        font-size: 17px;
        color: black;
        text-align: left;
        border-radius: 3px;
    }
</style>