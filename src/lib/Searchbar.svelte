<script>
  import { replace } from 'svelte-spa-router';

  let query = '';

  function onKeyUp() {
    if (query === '') {
      replace('/');
    } else {
      replace(`/search?query=${query}`);
    }
  }
</script>

<form on:submit|preventDefault>
    <input bind:value={query} id="search-input" on:keyup={onKeyUp} placeholder="Search..." type="text">
</form>

<style>
    #search-input {
        font-size: 17px;
        width: 300px;
        padding-left: 30px;
        text-align: left;
        text-decoration: none;
        color: black;
        border-radius: 3px;
        background-image: url("https://img.icons8.com/ios-glyphs/30/000000/search--v1.png");
        background-repeat: no-repeat;
    }
</style>