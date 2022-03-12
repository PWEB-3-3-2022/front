<script>
  import Logo from './Logo.svelte';
  import Hamburger from './Hamburger.svelte';

  export let sidebar = false;
</script>

<header class="flex justify-between bg-black p-2 items-center text-xl text-red-600 border-b-2">
    <nav class="flex">
        <Hamburger bind:open={sidebar}/>
        <Logo/>
    </nav>

</header>