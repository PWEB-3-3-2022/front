<script>
  import Router from 'svelte-spa-router';
  import Home from './pages/Home.svelte';
  import About from './pages/About.svelte';

  import Navbar from './lib/Navbar.svelte';
  import Sidebar from './lib/Sidebar.svelte';

  // For the sidebar
  let open = false;

  const routes = {
    '/': Home,
    '/about': About,
  };

  // Triggered when changing page
  function routeLoaded() {
    // Close the sidebar
    open = false;
  }
</script>

<Sidebar bind:open/>
<Navbar bind:sidebar={open}/>

<Router {routes} on:routeLoaded={routeLoaded}/>
