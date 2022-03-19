<script>
  import Router from 'svelte-spa-router';
  import Home from './pages/Home.svelte';
  import Search from './pages/Search.svelte';
  import About from './pages/About.svelte';

  import Navbar from './lib/Navbar.svelte';
  import Sidebar from './lib/Sidebar.svelte';
  import Footer from './lib/Footer.svelte';

  // For the sidebar
  let open = false;

  const routes = {
    '/': Home,
    '/search': Search,
    '/about': About,
  };

  // Triggered when changing page
  function routeLoaded() {
    // Close the sidebar
    open = false;
  }
</script>

<style>
  :global(main){
    min-height: 70vh;
  }
</style>

<Sidebar bind:open/>
<Navbar bind:sidebar={open}/>

<Router {routes} on:routeLoaded={routeLoaded}/>

<Footer/>
