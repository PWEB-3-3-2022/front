<script>
  import Logo from './Logo.svelte';
  import Hamburger from './Hamburger.svelte';
  import Searchbar from './Searchbar.svelte';

  export let sidebar = false;
</script>

<header class="bg-black p-2 text-xl text-red-600">
    <nav class="flex">
        <Hamburger bind:open={sidebar}/>
        <Logo/>
        <Searchbar/>
    </nav>

</header>